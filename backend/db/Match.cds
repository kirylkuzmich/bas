using KKuz_Team from './Team';
using Id from './Player';

entity KKuz_Match {
    key mcid : Id;
    tmhid : String(4);
    tmaid : String(4);
    date : String(10);
    sch : String(2);
    sca : String(2);
    createdOn : String(12);
    createdBy : String(30);

    toHomeTeam : association to one KKuz_Team on toHomeTeam.tmid = tmhid;
    toAwayTeam : association to one KKuz_Team on toAwayTeam.tmid = tmaid;
};