"use strict";
const dbClass = require(global.__base + "utils/dbClass");

function getDate(){
    let date = new Date();
    return date.toDateString().replace(/\s+/g,'-') + ' ' +
           date.getHours() + ':' +
           date.getMinutes() + ':' +
           date.getSeconds();
}

async function AddToLog(name, createdby) {
    let clientPromise = dbClass.createConnection();
    let db = new dbClass(await clientPromise);
    const oLog = new Object();
    oLog.name = name;
    oLog.lgid = await db.getNextval("lgid");
    oLog.createdon = getDate();
    oLog.createdby = createdby;

    const iSql = "INSERT INTO \"LOG\" VALUES(?, ?, ?, ?)";
    const aValues = [ oLog.lgid, oLog.name, oLog.createdon, o.Log.createdby ];

    await db.executeUpdate(iSql, aValues);
};