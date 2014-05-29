Les Joueurs
===========

Chaque joueur possède **un et un seul** robot (bot).

Structure des données
---------------------

**Nom du modèle:** Player

```json
{
  "name": <String>,
  "email": <String>,
  "bot": <botID>
}
```  

Inscription
-----------

		curl -X POST http://host:port/users/{{username}}/{{password}}/{{email}}  


Authentificaiton
----------------

		curl -X GET --user {{username}}:{{password}} http://host:port/....

