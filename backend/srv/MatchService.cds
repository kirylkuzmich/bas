using KKuz_Player as _Player from '../db/Player';
using KKuz_Team as _Team from '../db/Team';
using KKuz_Match as _Match from '../db/Match';
using KKuz_Logs as _Log from '../db/Logs';

service odata {

  entity KKuz_Player @(
		title: '{i18n>Player}',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Player;

  entity KKuz_Team @(
		title: '{i18n>Team}',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Team;

    entity KKuz_Match @(
		title: '{i18n>Match}',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Match;

		entity KKuz_Logs @(
		title: '{i18n>Log}',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Log;

}