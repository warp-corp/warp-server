# Warp

En 2134, l'Homme découvre un moyen de générer des "trous de ver", communément appelés "Warp". Ces passages permettent de rejoindre d'autres mondes (parallèles ou non, la question n'a pas encore été tranchée par les scientifiques).

Après plusieurs tentatives infructueuses pour faire passer des êtres vivants, il a été convenu que seuls des robots (communément appelés "Bots") seraient autorisés à emprunter ces trous de ver.

Quelques années après la découverte, une multinationale a fait joué ses relations afin d'avoir un accès privilégié à un Warp stabilisé. Son projet: créer un jeu retransmis sur le réseau où des joueurs pourront contrôler des robots envoyés sur un autre monde par le Warp afin de récolter des ressources rares. Les bénéfices seront partagés entre le joueur et la multinationale.

La compétition entre les joueurs est bien entendu encouragée et tous les coups sont permis pour devenir le robot N°1...

## Principes

- Un jeu de gestion/exploration dans un univers orienté SF
- Interface principale: une API REST
- Hardcore et monde extensible à volonté. Ex: la destruction du robot est définitive, le monde s'agrandit au fur et à mesure que les joueurs l'explorent.
- Un robot par compte à un instant T

## Le monde

- Divisé en "secteurs" (coordonnées x,y)
- Le secteur 0,0 est le point d'apparition du Warp
- Le secteur 0,0 est une zone de non-agression
- Le secteur 0,0 permet au robot d'échanger les ressources qu'ils ont récoltés contre de nouveaux modules d'équipement.
- Les secteurs s'étendent dans toutes les directions (le jeu génère les secteurs au fur et à mesure que les robots explorent le monde)

## Robots

