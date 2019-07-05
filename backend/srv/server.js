"use strict";

const https = require("https");
const port = process.env.PORT || 3000;
const server = require("http").createServer();
const xsenv = require("@sap/xsenv");
const xssec = require("@sap/xssec");
const xsHDBConn = require("@sap/hdbext");
const express = require("express");
const logging = require("@sap/logging");
const compression = require("compression");
const cds = require("@sap/cds");
const bodyParser = require('body-parser');

// if (process.argv[2] === "--debug") {
//     global.DEBUG_MODE = true;
//     console.log(process.argv[2]);
//     //Load environment variables for CLOUD
//     xsenv.loadEnv("debug-env.json");
// }

https.globalAgent.options.ca = xsenv.loadCertificates();
global.__base = __dirname + "/";

// Initialize Express App
const app = express();

//Body parser
app.use(bodyParser.json());

//Compression
app.use(compression({
    threshold: "1b"
}));

 const hanaOptions = xsenv.getServices({
     hana: {
         plan: "hdi-shared"
     }
 });

// let hanaOptions = {
//     hana: {
//         host: "10.253.93.93",
//         port: "30041",
//         encrypt: true,
//         sslValidateCertificate: false,
//         driver: "com.sap.db.jdbc.Driver",
//         url: "jdbc:sap://10.253.93.93:30041/?currentschema=KUZ_SCP",
//         schema: "KUZ_SCP",
//         hdi_user: "SBSS_10833640270122114459111887732432709988446507327479785702000065634",
//         hdi_password: "Mi8mjzlVEyru9fu7-hpRmKIpqFexZjvCAsAtjJmyOHhyIlJs6fVUcTiiIBiqNHeqJOTT6mIUN7BbQDR2J7ITTzIVVE9KYxrEIXfE3432N55b6VrDcoIdMJthYgUGLrDA",
//         user: "SBSS_13377071490103609428252630190038614441360904268573424909405821587",
//         password: "Cu53jWfxfxIxwEhQ-OJi7MwV8bm4zdgBoN_-WoLekgREHaiGnAP4oi5aBL61KlA2RbZv_YEk1uwy56eXnG3b-IoQJbjdkWGCjmu2eZuOaQC72niKSZwkqAbwwqxc_tw_"
//     }
// };

hanaOptions.hana.pooling = true;
app.use(
    xsHDBConn.middleware(hanaOptions.hana)
);

//CDS OData V4 Handler
cds.connect({
    kind: "hana",
    logLevel: "info",
    credentials: hanaOptions.hana
});
cds
    .serve("gen/csn.json", {
        crashOnError: false
    })
    .at("/odata/")
    .in(app)
    .catch(err => {
        // do not crash on error
    });

//logging
const appContext = logging.createAppContext();
app.use(logging.middleware({
    appContext: appContext,
    logNetwork: true
}));

//Error handling
app.use(function (err, req, res, next) {
    res.status(500).send({
        "msgId": "",
        "type": "Error",
        "msg": err.message
    });
});

//Setup Routes
require("./router")(app, server);

//Start the Server
server.on("request", app);
server.listen(port, () => console.info(`HTTP Server: ${server.address().port}`));

const schedulerExecute = require(global.__base + "utils/Scheduler").execute;
schedulerExecute ();
setInterval(schedulerExecute, 60 * 60 * 1000);