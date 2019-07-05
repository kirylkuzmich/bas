"use strict";

const express = require("express");
const request = require('request-promise');
const dbClass = require(global.__base + "utils/dbClass");

module.exports = {
    async execute(req) {
        try {
            let clientPromise = dbClass.createConnection();
            let db = new dbClass(await clientPromise);
            const sSql = `SELECT * FROM KKUZ_TEAM`;
            var result = await db.getVal(sSql);

            result[0].TMID = '0002';
            for (let i = 0; i < result.length; i++) {
                let oMatch = new Object();
                let setMcid = function () {
                    return new Promise((resolve) => {
                            let mcid = db.getNextval("mcid");
                            resolve(mcid);
                        })
                        .then((mcid) => {
                            oMatch.mcid = mcid;
                        });
                }

                let reqMatch = new Promise((resolve) => {
                        let reqOptions = {
                            url: 'https://api.football-data.org/v2/teams/' + result[i].TMID + '/matches',
                            method: 'GET',
                            headers: {
                                'X-Auth-Token': '99099a93ab56464abb8dda3519d035e6'
                            }
                        };
                        let res = request(reqOptions);
                        resolve(res);
                    })
                    .then((res) => {
                        const aResult = JSON.parse(res);
                        oMatch.tmhid = aResult.matches[0].homeTeam.id;
                        oMatch.tmaid = aResult.matches[0].awayTeam.id;
                        oMatch.date = aResult.matches[0].utcDate.slice(0, 10);
                        oMatch.sch = aResult.matches[0].score.fullTime.homeTeam;
                        oMatch.sca = aResult.matches[0].score.fullTime.awayTeam;
                    })
                    .then(setMcid);

                Promise.all([reqMatch, setMcid])
                    .then(() => {
                        let iSql = `INSERT INTO KKUZ_MATCH VALUES(?,?,?,?,?,?,?,?)`;
                        let aValues = [oMatch.mcid, oMatch.tmhid, oMatch.tmaid, oMatch.date, oMatch.sch, oMatch.sca, "19.06.2019", "KUZ"];
                        db.executeUpdate(iSql, aValues);
                    })
                    .catch(e => console.log(e.message));
            }
        } catch (e) {
            console.log("Error of Scheduler: " + e.message);
        };
    }
}