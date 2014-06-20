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
# npm install sqlite3 # Base de développement
./node_modules/knex/lib/bin/cli.js migrate:latest

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
