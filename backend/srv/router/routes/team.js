"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const log = require(global.__base + "utils/Logging");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const sSql = `SELECT * FROM KKUZ_TEAM`;
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oTeam = req.body;
			oTeam.tmid = await db.getNextval("tmid");

            const sSql = `INSERT INTO "KKUZ_TEAM" VALUES(?,?,?,?)`;
			const aValues = [ oTeam.tmid, oTeam.name, oTeam.createdon, oTeam.createdby ];


            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oTeam));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oTeam = req.body;
            const sSql = `UPDATE "KKUZ_TEAM" SET "NAME" = ?, "CREATEDON" = ?, "CREATEDBY" = ? WHERE "TMID" = ?`;
			const aValues = [ oTeam.name, oTeam.createdon, oTeam.createdby, oTeam.tmid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oTeam));
        } catch (e) {
            next(e);
        }
    });

    return app;
};