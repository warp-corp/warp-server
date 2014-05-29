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

		curl -X POST -H "Content-Type:application/json" -v -d '[{"name":"username", "password":"password", "email":"email_adress", "tel":"050505"}]' http://<host>:<port>/account
  

Authentificaiton
----------------

		curl -X GET --user {{username}}:{{password}} http://host:port/....

