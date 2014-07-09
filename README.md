Warp
====

Démarrer avec les sources
-------------------------

```
# Récupération des sources
git clone https://github.com/warp-corp/warp-server.git
cd warp-server
git checkout develop

# Installation des dépendances
npm install

# Initialisation de la BDD
# npm install sqlite3 # Base de développement
npm run migrate

# Si besoin, installer Bunyan
# sudo npm install -g bunyan
NODE_ENV=development node api | bunyan
```

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

Licence
-------

AGPL
