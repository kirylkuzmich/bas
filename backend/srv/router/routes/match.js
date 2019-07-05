"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const log = require(global.__base + "utils/Logging");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const sSql = `SELECT * FROM KKUZ_MATCH`;
            var result = await db.executeUpdate(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oMatch = req.body;
			oMatch.mcid = await db.getNextval("mcid");

            const sSql = `INSERT INTO "KKUZ_MATCH" VALUES(?,?,?,?,?,?,?,?)`;
			const aValues = [ oMatch.mcid, oMatch.tmhid, oMatch.tmaid, oMatch.date, oMatch.sch, oMatch.sca, oMatch.createdon, oMatch.createdby ];


            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oMatch));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oMatch = req.body;
            const sSql = `UPDATE "KKUZ_MATCH" SET "TMHID" = ?, "TMA" = ?, "DATE" = ?, "SCH" = ?, "SCA" = ?, "CREATEDON" = ?, "CREATEDBY" = ? WHERE "MCID" = ?`;
			const aValues = [ oMatch.tmhid, oMatch.tmaid, oMatch.date, oMatch.sch, oMatch.sca, oMatch.createdon, oMatch.createdby, oMatch.mcid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oMatch));
        } catch (e) {
            next(e);
        }
    });

    return app;
};