//MOCK service
module.exports = (srv) => {

    srv.on('READ', 'KKuz_Match', () => [
        {
            mcid: "0001", tmhid: "0001", tmaid: "0002", date: "18.05.2019", sch: "1", sca: "3", createdOn: "18.06.2019", createdBy: "KUZ",
            toHomeTeam: [
                { tmid: "0001", name: "Manchester United", createdOn: "18.06.2019", createdBy: "KUZ" }
            ],
            toAwayTeam: [
                { tmid: "0002", name: "Chelsea", createdOn: "18.06.2019", createdBy: "KUZ" }
            ]
        }
    ]);

    srv.on('READ', 'KKuz_Player', () => [
        {
            plid: "0001", tmid: "0001", name: "David de Gea",  position: "Goalkeeper", createdOn: "18.06.2019", createdBy: "KUZ",
            toTeam: [
                { tmid: "0001", name: "Manchester United", createdOn: "18.06.2019", createdBy: "KUZ",
                  toPlayer: { plid: "0001", tmid: "0001", name: "David de Gea",  position: "Goalkeeper", createdOn: "18.06.2019", createdBy: "KUZ" }}
            ]
        },
        {
            plid: "0002", tmid: "0002", name: "Frank Lampard", position: "Midfielder", createdOn: "18.06.2019", createdBy: "KUZ",
            toTeam: [
                { tmid: "0002", name: "TSG 1899 Hoffenheim", createdOn: "18.06.2019", createdBy: "KUZ",
                  toPlayer: { plid: "0002", tmid: "0002", name: "Frank Lampard", position: "Midfielder", createdOn: "18.06.2019", createdBy: "KUZ" }}
            ]
        }
    ]);

    srv.on('READ', 'KKuz_Team', () => [
        {
            tmid: "0001", name: "Manchester United", createdOn: "18.06.2019", createdBy: "KUZ",
            toPlayer: [
                { plid: '0001', tmid: "0001", name: "David de Gea",  position: "Goalkeeper", createdOn: "18.06.2019", createdBy: "KUZ" }
            ],
            toMatchH: [
                { mcid: "0001", tmhid: "0001", tmaid: "0002", date: "18.05.2019", sch: "1", sca: "3", createdOn: "18.06.2019", createdBy: "KUZ",
                  toHomeTeam: { tmid: "0001", name: "Manchester United", createdOn: "18.06.2019", createdBy: "KUZ" }}
            ]
        },
        {
            tmid: "0002", name: "TSG 1899 Hoffenheim", createdOn: "18.06.2019", createdBy: "KUZ",
            toPlayer: [
                {plid: "0002", tmid: "0002", name: "Frank Lampard", position: "Midfielder", createdOn: "18.06.2019", createdBy: "KUZ" }
            ],
            toMatchA: [
                { mcid: "0001", tmhid: "0001", tmaid: "0002", date: "18.05.2019", sch: "1", sca: "3", createdOn: "18.06.2019", createdBy: "KUZ",
                  toHomeTeam: { tmid: "0002", name: "TSG 1899 Hoffenheim", createdOn: "18.06.2019", createdBy: "KUZ" }}
            ]
        }
    ]);

    srv.on('READ', 'KKuz_Logs', () => [
        {
            usid : "0001", name: "Create new match Entry", createdOn: "18.06.2019", createdBy: "KUZ"
        }
    ])

};