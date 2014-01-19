# API REST

## TODO: Créer un compte

* **URL**

  /register

* **Méthode**

  `POST`

* **Paramètres d'URL**

  `Aucun`

* **Corps de la requête**

	**Mime Type:** `application/json`

  **Exemple:**
  
  ```json
  {
    "email": [string],
    "nickname": [string],
    "password": [string],
    "passwordConfirm": [string]
  }
  ```

* **Réponse en cas de succès**

  * **Code:** 204
    **Contenu:** `Aucun`

* **Réponse en cas d'erreur**

  * **Code:** 400
    **Contenu:** `{ "error": "Email already used." }`

  * **Code:** 400
    **Contenu:** `{ "error": "Invalid email." }`

  * **Code:** 400
    **Contenu:** `{ "error": "Passwords don't match." }`

  * **Code:** 400
    **Contenu:** `{ "error": "Nickname already tacken." }`

* **Exemple d'appel**

  **CURL**
  
  ```bash
  curl -v -X POST -d "{ "nickname": "JohnSnow", "email": "john.snow@winterfell.com", "password": "Winter is coming", "passwordConfirm": "Winter is coming" }" http://warp/register
  ```

## TODO: Accéder aux informations du compte

* **URL**

  /account

* **Méthode**

  `GET`

* **Paramètres d'URL**
  
  `Aucun`

* **Corps de la reqête**

  `Aucun`

* **Réponse en cas de succès**

  * **Code:** 200
    **Contenu:** `{ "nickname": "<pseudo_utilisateur>", "email": "<email_utilisateur>", "creationDate": "<date_creation_compte>" }`

* **Réponse en cas d'erreur**

  * **Code:** 401
    **Contenu:** `Aucun`

* **Exemple d'appel**

  **CURL**
  
  ```bash
  curl -v --user "<nickname>:<password>" http://warp/account
  ```

## TODO: Modifier mot de passe du compte
## TODO: Modifier pseudonyme du compte
## TODO: Modifier email du compte

