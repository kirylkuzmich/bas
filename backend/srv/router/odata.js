"use strict";

const dbClass = require(global.__base + "utils/dbClass");
const hdbext = require("@sap/hdbext");

const addWhereClause = (req, aWhere) => {
    req.query.SELECT.where = req.query.SELECT.where ?
        req.query.SELECT.where.concat(["and"]).concat(aWhere) :
        aWhere;

};
const getCompanyClause = sCompany => [{ref: ["mandt"]}, "=", {val: sCompany}];
const getLangClause = sLang => [{ref: ["lang"]}, "=", {val: sLang}];

module.exports = function () {
    this.before("READ", req => {
        req.log.debug(`BEFORE_READ ${req.target["@Common.Label"]}`);

        //restrict by mandt
        // addWhereClause(req, getCompanyClause("LeverX"));

        //restrict by lang
        // addWhereClause(req, getLangClause("EN"));
    });

    this.on("CREATE", "Logs", async (Log) => {
        req.log.debug(`ON CREATE ${req.target["@Common.Label"]}`);

        const {
            data
        } = Log;
        if (data.length < 1) {
            return null;
        }

        var client = await dbClass.createConnection();
        let db = new dbClass(client);

        if (!data.lgid) {
            data.lgid = await db.getNextval("lgid");
//		throw new Error(`Invalid email for ${data.FIRSTNAME}. No Way! E-Mail must be valid and ${data.EMAIL} has problems`);
        }

        data.name = "New log";
        data.createdby = "oDataAutoBot";
        data.createdon = "05/07/2019";

        const sSql = `INSERT INTO "KKUZ_LOGS" VALUES(?,?,?,?)`
        const aValues = [data.lgid, data.name, data.createdon, data.createdby];

        req.log.debug(aValues);
        req.log.debug(sSql);
        await db.executeUpdate(sSql, aValues);

        return data;
    });


    this.after("READ", "Logs", (entity) => {
        if (entity.length > 0) {
            // entity.forEach(item => item.mandt = "");
            entity.forEach(item => item.createdby = "oDataAutoBot");
        }
    });

};