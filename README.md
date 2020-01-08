# QuickDecks Backend

```json
"version": "1.0"
"description": "QUICKDECKS REST API"
"apihost":  "https://quickdecks-staging.herokuapp.com/"
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for contribution and testing purposes.

## Installing

- Clone Repository
  `$ git clone https://github.com/LABS-EU3/flashcards_backend.git`

- Change Directory
  `$ cd flashcards_backend`

- Install Node Modules
  `$ npm i`

- Setup Environment Variables (.env) on root folder:

  ```.env
  PORT
  TEST_DATABASE_URL
  DATABASE_URL
  SECRET
  EMAIL_SECRET
  DB_ENV
  FRONTEND_SITE
  NODEMAILER_EMAIL_ADDRESS
  NODEMAILER_EMAIL_PASSWORD
  ```

- To start API
  `$ npm start`
  or `$ npm run server`

## Running the tests

- To run tests on api
  - `$ npm test`
  - or use Postman

## Request & Response Examples

### Sample Response

Request Success ( **200 - OK** || **201 - CREATED** )

```json
{
  "message": "Success message",
  "key": "data"
}
```

Request Error ( **400 - Bad Request** || **404 - Not Found** || **403 - Unauthorized** || **500 - Internal Server Error** )

```json
{
  "error": "Error message"
}
```

### API Endpoints

| ENDPOINT                                                       | DESCRIPTION            |
| -------------------------------------------------------------- | ---------------------- |
| [GET /](#get)                                                  | Base URL               |
| [POST /api/auth/register](#post-apiauthregister)               | Register new User      |
| [POST /api/auth/login](#post-apiauthlogin)                     | Login for User         |
| [POST /api/auth/confirm_email](#post-apiauthconfirm_email)     | Confirm Email for User |
| [POST /api/auth/forgot_password](#post-apiauthforgot_password) | Request reset token    |
| [POST /api/auth/reset_password](#post-apiauthreset_password)   | Reset password         |
| [POST /api/cards/](#post-apicard)                              | Create Flashcard       |
| [GET /api/cards/all/:userId](#get-apicardalluserId)            | All flashcards of User |
| [GET /api/cards/:id](#get-apicardId)                           | View one flashcard     |
| [PUT /api/cards/:id](#put-apicardId)                           | Edit flashcard         |
| [DELETE /api/cards/:id](#delete-apicardId)                     | Delete flashcard       |

#### GET /

Response body:

```json
{
  "message": "Welcome to the QuickDecks API"
}
```

## Auth

#### POST /api/auth/register

_**Description**: Creates a new User Account with `"isConfirmed": "false"` by default_.

Request body:

```json
{
  "fullName": "Maaruf Dauda",
  "email": "maaruf@xyz.com",
  "password": "ALongSecurePassword"
}
```

Response body:

```json
{
  "message": "User created successfully",
  "data": {
    "token": "aTokenYouShouldNotBotherDecryprting.eyJzdWJqZWN0IjADfe3KLo98IjoiTWFhcnVmIERhdWRhIiwiaWF0IjoxNTc2NzYzNzA0LCJleHAiOjE1NzY4NTAxMDR9.jsihrtPG37mKBHp3xvjrQ-UselessRjSMr5YlPovG5A",
    "user": {
      "id": 1,
      "full_name": "Maaruf Dauda",
      "email": "maaruf@xyz.com",
      "image_url": null,
      "isConfirmed": false
    }
  }
}
```

#### POST /api/auth/login

_**Description**: Returns an Access token, contains the entire user object as well_.

Request body:

```json
{
  "email": "anna@email.com",
  "password": "SecurityIsNotAFad"
}
```

Response body:

```json
{
  "token": "aTokenYouShouldNotBotherDecryprting.eyJzdWJqZWN0IjADfe3KLo98IjoiTWFhcnVmIERhdWRhIiwiaWF0IjoxNTc2NzYzNzA0LCJleHAiOjE1NzY4NTAxMDR9.jsihrtPG37mKBHp3xvjrQ-UselessRjSMr5YlPovG5A",
  "user": {
    "id": 1,
    "full_name": "Anna",
    "email": "anna@xyz.com",
    "image_url": null,
    "isConfirmed": false
  }
}
```

#### POST /api/auth/confirm_email

_**Description**: Confirms Email for a User. Email token must be passed in. Returns an Acces token for the user._.

Request body:

```json
{
  "token": "anEmailTokenYouShouldNotBotherDecryprting.eyJzdWJqZWN0IjADfe3KLo98IjoiTWFhcnVmIERhdWRhIiwiaWF0IjoxNTc2NzYzNzA0LCJleHAiOjE1NzY4NTAxMDR9.jsihrtPG37mKBHp3xvjrQ-UselessRjSMr5YlPovG5A"
}
```

Response body:

```json
{
  "message": "User with email: maaruf@xyz.com confirmed.",
  "token": "aTokenYouShouldNotBotherDecryprting.eyJzdWJqZWN0IjADfe3KLo98IjoiTWFhcnVmIERhdWRhIiwiaWF0IjoxNTc2NzYzNzA0LCJleHAiOjE1NzY4NTAxMDR9.jsihrtPG37mKBHp3xvjrQ-UselessRjSMr5YlPovG5A"
}
```

#### POST /api/auth/forgot_password

_**Description**: Begins password reset process by sending email token to the user's registered email._.

Request body:

```json
{
  "email": "anna@xyz.com"
}
```

Response body:

```json
{
  "message": "Email sent to user"
}
```

#### POST /api/auth/reset_Password

_**Description**: Completes password reset process. Changes user's saved password. Passwords must match._.

Request body:

```json
{
  "password": "toldYouSecurityIsNotAFad",
  "confirmPassword": "toldYouSecurityIsNotAFad"
}
```

Response body:

```json
{
  "message": "Password reset successfully."
}
```

## Decks

## Flashcards

#### POST /api/cards/

_**Description**: Creates a flashcard in a deck._.

Request body:

```json
{
  "deckId": 1,
  "userId": 1,
  "questionText": "How do I create a flashcard",
  "answerText": "Post to /api/card",
  "imageUrl": "www.realurl.com"
}
```

Required: deckId: int, userId: int, questionText: String, answertText: String

Response body:

```json
{
  "message": "`Successfully created card with the id of 1"
}
```

#### GET /api/cards/all/:userId

_**Description**: Retrieves all flashcards made by a specific User._.

Request body:

```json
{}
```

Response body:

```json
[
  {
    "id": 2,
    "deck_id": 1,
    "user_id": 1,
    "question": "here is my question answer me",
    "answer": "here is my answer question me",
    "image_url": null,
    "created_at": "2020-01-08T10:44:38.761Z",
    "updated_at": "2020-01-08T10:44:38.761Z"
  },
  {
    "id": 3,
    "deck_id": 1,
    "user_id": 1,
    "question": "here is my question answer me",
    "answer": "here is my answer question me",
    "image_url": null,
    "created_at": "2020-01-08T10:45:05.269Z",
    "updated_at": "2020-01-08T10:45:05.269Z"
  },
  {
    "id": 5,
    "deck_id": 1,
    "user_id": 1,
    "question": "here is my question answer me",
    "answer": "here is my answer question me",
    "image_url": null,
    "created_at": "2020-01-08T11:34:52.174Z",
    "updated_at": "2020-01-08T11:34:52.174Z"
  }
]
```

#### GET /api/cards/:id

_**Description**: Retrieves a specific card by the card's id._.

Request body:

```json
{}
```

Response body:

```json
{
  "id": 3,
  "deck_id": 1,
  "user_id": 1,
  "question": "here is my question answer me",
  "answer": "here is my answer question me",
  "image_url": null,
  "created_at": "2020-01-08T10:45:05.269Z",
  "updated_at": "2020-01-08T10:45:05.269Z"
}
```

#### PUT /api/cards/:id

_**Description**: Edit a flashcard by flashcard Id._.

Request body:

```json
{
  "deck_id": 1,
  "question": "different question",
  "answer": "different question",
  "image_url": "www.gify.com/image"
}
```

Response body:

```json
{
  "message": "Successfully updated card with the id of id"
}
```

#### DELETE /api/cards/:id

_**Description**: Delete a flashcard._.

Request body:

```json
{}
```

Response body:

```json
{
  "message": "Successfully delete card with id 1"
}
```

## Technologies

- Node | Express | hapi/joi | bcryptjs | cors | knex | Postgres | Jest | Supertest | jsonwebtoken
