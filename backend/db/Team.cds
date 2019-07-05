using KKuz_Player from './Player';
using KKuz_Match from './Match';
using Id from './Player';

entity KKuz_Team {
    key tmid : Id;
    name : String(100);
    createdOn : String(12);
    createdBy : String(30);

    toPlayer : association to many KKuz_Player on toPlayer.tmid = tmid;
    toMatchH : association to many KKuz_Match on toMatchH.tmhid = tmid;
    toMatchA : association to many KKuz_Match on toMatchA.tmaid = tmid;
};