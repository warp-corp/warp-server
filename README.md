Warp
====

Démarrer avec les sources
-------------------------

```
# Récupération des sources
git clone http://git.lookingfora.name/Will/warp.git
cd warp
git checkout develop

# Installation des dépendances
npm install

# Initialisation de la BDD
npm install sqlite3 # Base de développement
./node_modules/knex/lib/bin/cli.js migrate:latest

# Si besoin, installer Bunyan
# sudo npm install -g bunyan
NODE_ENV=development node api | bunyan
```

Démarrer le jeu
---------------

**Créer le secteur Origin [0,0]**  

	curl -X GET -H "Content-Type:application/json" -v -u "user:password" http://loacalhost:8080/sector/bootstrap
  
**Récupérer les informations du bot**  

	curl -X GET -H "Content-Type:application/json" -v -u "user:password" http://loacalhost:8080/bot

  
**Récupérer les informations du secteur courant**  

	curl -X GET -H "Content-Type:application/json" -v -u "user:password" http://loacalhost:8080/sector 

**Se déplacer**  

	curl -X POST -H "Content-Type:application/json" -v -u "user:password" -d '{"name":"move", "params": {"dir": "[N|S|E|W|NW|NE|SE|SW]"}}' http://localhost:8080/bot/actions
  
`"dir"` peut prendre l'une des valeurs entre [] pour Nord, Sud, East, West, et les diagonales.  
  
  
**Scanner les bots présents dans la zone**  

	curl -X POST -H "Content-Type:application/json" -v -u "user:password" -d '{"name":"scanbot"}' http://localhost:8080/bot/actions

Générer la documention de l'API au format HTML
----------------------------------------------

Installer aglio
```
sudo npm install aglio -g
```

Puis générer la doc
```
cd warp
aglio -i doc/api.md -o api.html
```
