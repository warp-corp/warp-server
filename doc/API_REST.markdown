# API REST

## TODO: Create account

* **URL**

  /register

* **Method**

  `POST`

* **URL Params**

  `Aucun`

* **Data Params**

	**Mime Type:** `application/json`

  **Example:**
  
  ```json
  {
    "email": [string],
    "nickname": [string],
    "password": [string],
    "passwordConfirm": [string]
  }
  ```

* **Success Response**

  * **Code:** 204
    **Content:** `None`

* **Error Response**

  * **Code:** 400<br>
    **Content:** `{ "error": "Email already used." }`

  * **Code:** 400<br>
    **Content:** `{ "error": "Invalid email." }`

  * **Code:** 400
    **Content:** `{ "error": "Passwords don't match." }`

  * **Code:** 400
    **Content:** `{ "error": "Nickname already taken." }`

* **Sample Call**

  **CURL**
  
  ```bash
  curl -v -X POST -d "{ "nickname": "JohnSnow", "email": "john.snow@winterfell.com", "password": "Winter is coming", "passwordConfirm": "Winter is coming" }" http://warp/register
  ```

## TODO: Show account informations

* **URL**

  /account

* **Method**

  `GET`

* **URL Params**
  
  `Aucun`

* **Data Params**

  `None`

* **Success Response**

  * **Code:** 200
    **Content:** `{ "nickname": "<pseudo_utilisateur>", "email": "<email_utilisateur>", "creationDate": "<date_creation_compte>" }`

* **Error Response**

  * **Code:** 401
    **Content:** `None`

* **Sample Call**

  **CURL**
  
  ```bash
  curl -v --user "<nickname>:<password>" http://warp/account
  ```

## TODO: Modifier mot de passe du compte
## TODO: Modifier pseudonyme du compte
## TODO: Modifier email du compte