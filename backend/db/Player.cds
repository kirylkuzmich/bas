type Id : String(4);
using KKuz_Team from './Team';

entity KKuz_Player {
    key plid : Id;
    tmid : String(4);
    name : String(100);
    position : String(50);
    createdOn : String(12);
    createdBy : String(30);
    
    toTeam : association to one KKuz_Team on toTeam.tmid = tmid;
};