Les Bots
========

Un "Bot" est un robot d'exploration envoyé afin d'arpenter les mondes à l'autre bout des portails warp.
Afin d'affronter les dangers qui l'attendent, le bot est équipé de modules qui étendent ses capacités d'action.

Structure des données
---------------------

**Nom du modèle:** Bot

```json
{
	"sector": <ZoneID>,
  "coords": {
    "x": <Number>,
    "y": <Number>
  },
  "player": <PlayerID>,
  "createdAt": <Date>,
  "slots": [<Module>],
  "maxSlots": <Number>,
  "actions": [<Action>]
}
```