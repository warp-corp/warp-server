Warp
====

Démarrer avec les sources
-------------------------

```
git clone http://git.lookingfora.name/Will/warp.git
cd warp
git checkout develop
npm install
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