FORMAT: 1A
HOST: https://api.warp-corp.net

# API Warp

Warp est un jeu Web via API REST/JSON

## Authentification

L'authentification dans Warp s'effectue via la méthode [Basic Auth](http://fr.wikipedia.org/wiki/HTTP_Authentification#M.C3.A9thode_Basic)

# Group Compte

## Opérations liées au compte du joueur [/account]

### Créer un nouveau compte [POST]

**Exemple de requête CURL**
```bash
curl -v \
-X 'POST' \
-H 'Content-Type: application/json' \
-d '{"name": "JohnDoe", "password":"ceci_n_est_pas_un_mdp", "email": "john.doe@warp-corp.net"}' \
https://api.warp-corp.net/account
```

+ Request (application/json)

        {
            "name": "Nom de l'utilisateur",
            "email": "Email de l'utilisateur",
            "password": "Mot de passe de l'utilisateur"
        }


+ Response 201 (application/json)

        {
            "name": "",
            "email": "",
            "bot": "",
            "_id": ""
        }

### Récupérer les informations du compte [GET]

**Exemple de requête CURL**
```bash
curl -v \
-X 'GET' \
-u 'username:password' \
https://api.warp-corp.net/account
```

+ Request

    + Headers

            Authorization: Basic base64(username:password)

+ Response 200 (application/json)

        {
            "name": "",
            "email": "",
            "bot": "",
            "_id": ""
        }

# Group Jeu

## Opérations liées au Bot [/bot]