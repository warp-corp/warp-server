API REST
========

Create account *(status: not implemented)*
------------------------------------------

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

  * **Code:** 204<br>
    **Content:** `None`

* **Error Response**

  * **Code:** 400<br>
    **Content:** `{ "error": "Email already used." }`

  * **Code:** 400<br>
    **Content:** `{ "error": "Invalid email." }`

  * **Code:** 400<br>
    **Content:** `{ "error": "Passwords don't match." }`

  * **Code:** 400<br>
    **Content:** `{ "error": "Nickname already taken." }`

* **Sample Call**

  **CURL**
  
  ```bash
  curl -v -X POST -d "{ "nickname": "JohnSnow", "email": "john.snow@winterfell.com", "password": "Winter is coming", "passwordConfirm": "Winter is coming" }" http://warp/register
  ```

Show account informations (status: not implemented)
---------------------------------------------------

* **URL**

  /account

* **Method**

  `GET`

* **URL Params**
  
  `Aucun`

* **Data Params**

  `None`

* **Success Response**

  * **Code:** 200<br>
    **Content:** `{ "nickname": "<pseudo_utilisateur>", "email": "<email_utilisateur>", "creationDate": "<date_creation_compte>" }`

* **Error Response**

  * **Code:** 401<br>
    **Content:** `None`

* **Sample Call**

  **CURL**
  
  ```bash
  curl -v --user "<nickname>:<password>" http://warp/account
  ```

Modifier mot de passe du compte *(status: not implemented)*
-----------------------------------------------------------

Modifier pseudonyme du compte *(status: not implemented)*
---------------------------------------------------------

Modifier email du compte *(status: not implemented)*
----------------------------------------------------