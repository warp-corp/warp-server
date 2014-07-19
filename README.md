# Warp

## Démarrer avec les sources

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
NODE_ENV=development node server | bunyan
```
## Outils

### Générer la documention de l'API au format HTML

Installer aglio  
```
sudo npm install aglio -g
```

Puis générer la doc  
```
cd warp
aglio -i doc/api.md -o api.html
```

### Administration: Afficher la carte globale

Lancer le micro-serveur d'aggrégation des secteurs
```
cd warp-server
# Lancer un petit serveur HTTP écoutant sur le port 8081
node tools/map-viewer/server
```
**/!\** Bien se placer dans le répertoire racine (`warp-server`) sinon le serveur ne trouvera pas le fichier de configuration du jeu.

Puis dans un navigateur, afficher `http://localhost:8081`

## Licence

AGPL
