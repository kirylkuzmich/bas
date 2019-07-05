"use strict";

module.exports = (app, server) => {
    app.use("/player", require("./routes/player")());
    app.use("/log", require("./routes/logs")());
    app.use("/match", require("./routes/match")());
    app.use("/team", require("./routes/team")());
    app.use("/dest", require("./routes/dest")());
};