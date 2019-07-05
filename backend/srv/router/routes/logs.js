"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const log = require(global.__base + "utils/Logging");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const sSql = `SELECT * FROM KKUZ_LOGS`;
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLog = req.body;
			oLog.lgid = await db.getNextval("lgid");

            const sSql = 'INSERT INTO "KKUZ_LOGS" VALUES(?,?,?,?)';
			const aValues = [ oLog.lgid, oLog.name, oLog.createdon, oLog.createdby ];


            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oLog));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLog = req.body;
            const sSql = 'UPDATE "KKUZ_LOGS" SET "NAME" = ?, "CREATEDON" = ?, "CREATEDBY" = ? WHERE "LGID" = ?';
			const aValues = [ oLog.name, oLog.createdon, oLog.createdby, oLog.lgid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oLog));
        } catch (e) {
            next(e);
        }
    });

    return app;
};