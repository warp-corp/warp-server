Les Bots
========

Un bot est un robot d'exploration envoyé afin d'arpenter les mondes à l'autre bout des portails warp.
Afin d'affronter les dangers qui l'attendent, le bot est équipé de modules qui étendent ses capacités d'action.


Structure des données
---------------------

**Nom du modèle:** Bot

```json
{
  "sector": {
    "x": <Number>,
    "y": <Number>
  },
  "player": <PlayerID>,
  "createdAt": <Date>,
  "modules": [<Module>],
  "actions": [<Action>]
}
```