/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const log = require(global.__base + "utils/Logging");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const sSql = `SELECT KKUZ_PLAYER.PLID, KKUZ_PLAYER.NAME, KKUZ_PLAYER.POSITION, KKUZ_PLAYER.CREATEDON, KKUZ_PLAYER.CREATEDBY, KKUZ_TEAM.NAME AS TEAM
             FROM KKUZ_PLAYER INNER JOIN KKUZ_TEAM ON KKUZ_PLAYER.TMID = KKUZ_TEAM.TMID`;
            var result = await db.executeUpdate(sSql);
            
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oPlayer = req.body;
			oPlayer.plid = await db.getNextval("plid");

            const sSql = `INSERT INTO KKUZ_PLAYER VALUES(?,?,?,?,?,?)`;
			const aValues = [ oPlayer.plid, oPlayer.tmid, oPlayer.name, oPlayer.position, oPlayer.createdon, oPlayer.createdby ];

            await db.executeUpdate(sSql, aValues);
            console.log(aValues);

            res.type("application/json").status(201).send(JSON.stringify(oPlayer));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oPlayer = req.body;
            const sSql = `UPDATE "KKUZ_PLAYER" SET "TMID" = ?, "NAME" = ?, "POSITION" = ?, "CREATEDON" = ?, "CREATEDBY" = ? WHERE "PLID" = ?`;
			const aValues = [ oPlayer.tmid, oPlayer.name, oPlayer.position, oPlayer.createdon, oPlayer.createdby, oPlayer.plid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oPlayer));
        } catch (e) {
            next(e);
        }
    });

    return app;
};