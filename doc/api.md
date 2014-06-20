FORMAT: 1A
HOST: ${API_ENDPOINT}

# API Warp

Warp est un jeu massivement multijoueurs dont l'ensemble des interactions se reposent sur une API [REST](https://fr.wikipedia.org/wiki/Representational_State_Transfer)/[JSON](https://fr.wikipedia.org/wiki/JSON).

## Authentification

L'authentification dans Warp s'effectue via la méthode [Basic Auth](http://fr.wikipedia.org/wiki/HTTP_Authentification#M.C3.A9thode_Basic).

## Schémas de validation

Les schémas de validation des données sont écris au format [JSON-Schema](http://json-schema.org/).

# Group Compte

## Gérer son compte [/account]

## Créer un nouveau compte [POST]

**Exemples**

JQuery
```
$.ajax({
    method: "POST",
    url: "${API_ENDPOINT}/account",
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
${API_ENDPOINT}/account
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

### Récupérer ses informations [GET]

**Authentification requise**

**Exemples**

JQuery
```
$.ajax({
    url: "${API_ENDPOINT}/account",
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
${API_ENDPOINT}/account
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

### Supprimer son compte [DELETE]

**Authentification requise**

**Exemples**

JQuery
```
$.ajax({
    url: "${API_ENDPOINT}/account",
    method: "DELETE",
    headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
    },
    success: function() {
        console.log('Compte supprimé !');
    }
})
```

CURL
```bash
curl -v \
-X 'DELETE' \
-u 'username:password' \
${API_ENDPOINT}/account
```

+ Request

    + Headers

            Authorization: Basic base64(username:password)

+ Response 204

# Group Jeu

## Récupérer les informations du robot [/bot]

### Récupérer les informations du robot [GET]

**Authentification requise**

**Exemples**

JQuery
```
$.ajax({
    url: "${API_ENDPOINT}/account",
    headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
    },
    success: function(bot) {
        console.log(bot); // Affiche le résultat dans la console
    }
})
```

CURL
```bash
curl -v \
-X 'GET' \
-u 'username:password' \
${API_ENDPOINT}/bot
```

+ Response 200

    + Headers

            Content-Type: application/json

    + Body

            {
                "shield": 100,
                "sector": {
                    "x": 0,
                    "y": 0,
                    "type": "base",
                    "safe": 1
                },
                "cooldowns": [
                    {
                        "action": "move",
                        "timestamp": 1403291692940
                    },
                    {
                        "action": "scanbot",
                        "timestamp": 1403291651192
                    }
                ],
                "slots": [],
                "cargo": [],
                "cpus": 5,
                "ram": 128,
                "max_actions": 2,
                "max_slots": 10,
                "max_cargo": 10,
                "available_actions": [
                    "move",
                    "scanbot"
                ]
            }

    + Schema

            {

            }

## Effectuer une action [/bot/actions]

### Effectuer une action [POST]

**Authentification requise**

**Exemples**

CURL
```bash
curl -v \
-X 'POST' \
-H 'Content-Type: application/json' \
-u 'username:password' \
-d '{ "name": "move", "params": { "dir": "N" } }' \
${API_ENDPOINT}/bot/actions
```

+ Request

    + Headers

            Content-Type: application/json

    + Body

            {
                "action": "move",
                "params": {
                    "dir": "N"
                }
            }

    + Schema

            {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "params": {
                        "type": "object"
                    }
                },
                "required": ["name"]
            }

+ Response 200

    + Headers

            Content-Type: application/json

    + Body

            {
                "action": "move",
                "results": {
                    "sector": {
                        "x": -1,
                        "y": -5,
                        "type": "base",
                        "safe": 0
                    }
                }
            }

    + Schema

            {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "properties": {
                    "action": {
                        "type": "string"
                    },
                    "results": {
                        "type": "object"
                    }
                },
                "required": ["action"]
            }