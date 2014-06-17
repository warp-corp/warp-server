FORMAT: 1A
HOST: https://api.warp-corp.net

# API Warp

Warp est un jeu massivement multijoueurs dont l'ensemble des interactions se reposent sur une API [REST](https://fr.wikipedia.org/wiki/Representational_State_Transfer)/[JSON](https://fr.wikipedia.org/wiki/JSON).

## Authentification

L'authentification dans Warp s'effectue via la méthode [Basic Auth](http://fr.wikipedia.org/wiki/HTTP_Authentification#M.C3.A9thode_Basic).

## Schémas de validation

Les schémas de validation des données sont écris au format [JSON-Schema](http://json-schema.org/).

# Group Compte

## Opérations liées au compte du joueur [/account]

### Créer un nouveau compte [POST]

**Exemples**

JQuery
```
$.ajax({
    method: "POST",
    url: "https://api.warp-corp.net/account"
    data: {
        name: "JohnDoe",
        password: "SE5kcgWDPt1sLNoA",
        email: "john.doe@warp-corp.net"
    },
    dataType: "json",
    success: function(account) {
        console.log(account); // Affiche le résultat dans la console
    }
})
```

CURL
```
curl -v \
-X 'POST' \
-H 'Content-Type: application/json' \
-d '{"name": "JohnDoe", "password":"SE5kcgWDPt1sLNoA", "email": "john.doe@warp-corp.net"}' \
https://api.warp-corp.net/account
```

+ Request

    + Headers

            Content-Type: application/json

    + Body

            {
                "name": "JohnDoe",
                "email": "john.doe@warp-corp.net",
                "password": "SE5kcgWDPt1sLNoA"
            }

    + Schema

            {
                "type": "object",
                "$schema": "http://json-schema.org/draft-04/schema#",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string",
                    },
                    "email": {
                        "type": "string"
                    }
                },
                "required": ["name", "password", "email"]
            }

+ Response 201 

    + Headers 

            Content-Type: application/json

    + Body

            {
                "name": "JohnDoe",
                "email": "john.doe@warp-corp.net"
            }

    + Schema

            {
                "type": "object",
                "$schema": "http://json-schema.org/draft-04/schema#",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    }
                }
            }

### Récupérer les informations du compte [GET]

**Authentification requise**

**Exemples**

JQuery
```
$.ajax({
    url: "https://api.warp-corp.net/account"
    dataType: "json",
    headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
    },
    success: function(account) {
        console.log(account); // Affiche le résultat dans la console
    }
})
```

CURL
```bash
curl -v \
-X 'GET' \
-u 'username:password' \
https://api.warp-corp.net/account
```

+ Request

    + Headers

            Authorization: Basic base64(username:password)

+ Response 200

    + Headers

            Content-Type: application/json

    + Body

            {
                "name": "JohnDoe",
                "email": "john.doe@warp-corp.net"
            }

    + Schema

            {
                "type": "object",
                "$schema": "http://json-schema.org/draft-04/schema#",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    }
                }
            }

# Group Jeu

## Opérations liées au Bot [/bot]