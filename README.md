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
**Lancer le ticker**
```
NODE_ENV=development node ticker | bunyan
```
