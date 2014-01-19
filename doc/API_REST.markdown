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

  * **Code:** 204 <br />
    **Contenu:** `Aucun`

* **Réponse en cas d'erreur**

  * **Code:** 400 <br />
    **Contenu:** `{ error: "Email already used." }`

  * **Code:** 400 <br />
    **Contenu:** `{ error: "Invalid email." }`

  * **Code:** 400 <br />
    **Contenu:** `{ error: "Passwords don't match." }`

  * **Code:** 400 <br />
    **Contenu:** `{ error: "Nickname already tacken." }`

* **Exemple d'appel**

  **CURL**
  
  ```bash
  curl -X POST -d "{ "nickname": "JohnSnow", "email": "john.snow@winterfell.com", "password": "Winter is coming", "passwordConfirm": "Winter is coming" }" http://warp/register
  ```