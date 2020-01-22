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
| [POST /api/auth/update_password] 				 | Update password	  |
| -------------------------------------------------------------- | ---------------------- |
| [POST /api/decks](#post-apidecks)                              | Create deck            |
| [GET /api/decks](#get-apidecks)                                | All decks of User      |
| [GET /api/decks/public](#get-apideckspublic)                   | all public decks       |
| [GET /api/decks/:id](#get-apidecksId)                          | View one deck          |
| [PUT /api/decks/:id](#put-apidecksId)                          | Edit deck              |
| [DELETE /api/decks/:id](#delete-apidecksId)                    | Delete deck            |
| [GET /api/decks/favorite](#get-apideckstag)                    | Get most used tags     |
| [GET /api/decks/access/](#put-apidecksaccess)                  | 10 decks last accessed |
| [PUT /api/decks/access/:id](#put-apidecksaccessId)             | Update deck access time|
| [DELETE /api/decks/access/:id](#put-apidecksaccessId)          | Remove accessed entry  |
| -------------------------------------------------------------- | ---------------------- |
| [POST /api/cards](#post-apicards)                              | Create Flashcard       |
| [GET /api/cards](#get-apicards)                                | All flashcards of User |
| [GET /api/cards/:id](#get-apicardsId)                          | View one flashcard     |
| [PUT /api/cards/:id](#put-apicardsId)                          | Edit flashcard         |
| [DELETE /api/cards/:id](#delete-apicardsId)                    | Delete flashcard       |
| [GET /api/cards/COTD](#get-apicardsCOTD)                       | Get card of the Day    |

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

#### POST /api/auth/update_Password

_**Description**: updates a user's password._.

Request body:

```json
{
	"oldPassword": "my old password",
	"newPassword": "my new password",
	"confirmPassword": "matches my new password"
}
```

Response body:

```json
{
  "message": "Password updated successfully"
}
```

## Decks

#### POST /api/decks

_**Description**: Creates a deck._.

Request body:

```json
{
  "name": "New Decks",
  "tags": [1, 2, 3, 4]
}
```

Required: name: string, tags: [int],

Response body:

```json
{
  "deck": {
    "id": 9,
    "user_id": 8,
    "name": "New Decks",
    "public": false,
    "created_at": "2020-01-13T17:10:54.290Z",
    "updated_at": "2020-01-13T17:10:54.290Z"
  }
}
```

#### GET /api/decks

_**Description**: Retrieves all decks made by a specific User._.

Request body:

```json
{}
```

Response body:

```json
{
  "data": [
    {
      "deck_id": 8,
      "user_id": 8,
      "deck_name": "nasdaasdsad",
      "public": false,
      "created_at": "2020-01-13T15:51:07.998Z",
      "updated_at": "2020-01-13T15:51:07.998Z",
      "tags": [
        "Aeronautical & Manufacturing Engineering",
        "Agriculture & Forestry",
        "Building",
        "Counselling",
        "Film Making",
        "Hospitality"
      ]
    },
    {
      "deck_id": 9,
      "user_id": 8,
      "deck_name": "New Decks",
      "public": false,
      "created_at": "2020-01-13T17:10:54.290Z",
      "updated_at": "2020-01-13T17:10:54.290Z",
      "tags": [
        "Accounting & Finance",
        "Aeronautical & Manufacturing Engineering",
        "Agriculture & Forestry",
        "American Studies"
      ]
    }
  ]
}
```

#### GET /api/decks/public

_**Description**: Get users private decks and all public decks_.

Request body:

```json
{}
```

Response body:

```json
{
  "data": [
    {
      "deck_id": 1,
      "user_id": 1,
      "deck_name": "Statistical Learning",
      "public": true,
      "created_at": "2020-01-13T15:49:59.080Z",
      "updated_at": "2020-01-13T15:49:59.080Z",
      "tags": [
        "Accounting & Finance",
        "Aeronautical & Manufacturing Engineering"
      ]
    },
    {
      "deck_id": 3,
      "user_id": 3,
      "deck_name": "Technology ",
      "public": true,
      "created_at": "2020-01-13T15:49:59.080Z",
      "updated_at": "2020-01-13T15:49:59.080Z",
      "tags": ["Anthropology", "Archaeology"]
    },
    {
      "deck_id": 4,
      "user_id": 4,
      "deck_name": "Biology ",
      "public": true,
      "created_at": "2020-01-13T15:49:59.080Z",
      "updated_at": "2020-01-13T15:49:59.080Z",
      "tags": ["Architecture", "Art & Design"]
    },
    {
      "deck_id": 5,
      "user_id": 5,
      "deck_name": "Basic General Knowledge",
      "public": true,
      "created_at": "2020-01-13T15:49:59.080Z",
      "updated_at": "2020-01-13T15:49:59.080Z",
      "tags": ["Aural & Oral Sciences", "Biological Sciences"]
    },
    {
      "deck_id": 6,
      "user_id": 6,
      "deck_name": "Famous Personalities",
      "public": true,
      "created_at": "2020-01-13T15:49:59.080Z",
      "updated_at": "2020-01-13T15:49:59.080Z",
      "tags": ["Building", "Business & Management Studies"]
    }
  ]
}
```

#### GET /api/decks/:id

_**Description**: Edit a deck by deck Id._.

Request body:

```json
{}
```

Response body:

```json
{
  "deck": {
    "deck_id": 6,
    "user_id": 6,
    "deck_name": "Famous Personalities",
    "public": true,
    "created_at": "2020-01-13T15:49:59.080Z",
    "updated_at": "2020-01-13T15:49:59.080Z"
    "tags": [
      {
        "id": 12,
        "name": "Building"
      },
      {
        "id": 13,
        "name": "Business & Management Studies"
      }
    ],
    "flashcards": [
      {
        "id": 11,
        "deck_id": 6,
        "user_id": 6,
        "question": "Who is the father of Geometry?",
        "answer": "Euclid",
        "image_url": null,
        "created_at": "2020-01-13T10:49:59.086613-05:00",
        "updated_at": "2020-01-13T10:49:59.086613-05:00"
      },
      {
        "id": 12,
        "deck_id": 6,
        "user_id": 6,
        "question": "The Indian to beat the computers in mathematical wizardry is",
        "answer": "Shakunthala Devi",
        "image_url": null,
        "created_at": "2020-01-13T10:49:59.086613-05:00",
        "updated_at": "2020-01-13T10:49:59.086613-05:00"
      }
    ]
  }
}
```

#### PUT /api/decks/:id

_**Description**: Edit a deck._.

Request body:

```json
{
  "name": "New Decks",
  "addTags": [1, 2, 3, 4],
  "removeTags": [13]
}
```

Response body:

```json
{
  "deck_id": 6,
  "user_id": 6,
  "deck_name": "New Decks",
  "public": true,
  "created_at": "2020-01-13T15:49:59.080Z",
  "updated_at": "2020-01-13T15:49:59.080Z",
  "tags": [
    {
      "id": 1,
      "name": "Accounting & Finance"
    },
    {
      "id": 2,
      "name": "Aeronautical & Manufacturing Engineering"
    },
    {
      "id": 3,
      "name": "Agriculture & Forestry"
    },
    {
      "id": 4,
      "name": "American Studies"
    },
    {
      "id": 12,
      "name": "Building"
    }
  ],
  "flashcards": [
    {
      "id": 11,
      "deck_id": 6,
      "user_id": 6,
      "question": "Who is the father of Geometry?",
      "answer": "Euclid",
      "image_url": null,
      "created_at": "2020-01-13T10:49:59.086613-05:00",
      "updated_at": "2020-01-13T10:49:59.086613-05:00"
    },
    {
      "id": 12,
      "deck_id": 6,
      "user_id": 6,
      "question": "The Indian to beat the computers in mathematical wizardry is",
      "answer": "Shakunthala Devi",
      "image_url": null,
      "created_at": "2020-01-13T10:49:59.086613-05:00",
      "updated_at": "2020-01-13T10:49:59.086613-05:00"
    }
  ]
}
```

#### DELETE /api/decks/:id

_**Description**: Delete a deck._.

Request body:

```json
{}
```

Response body:

```json
{}
```

#### GET /api/decks/access/

_**Description**: Get users last accessed decks._.

Request body:

```json
{}
```

Response body:

```json
{
  "data": [
    {
      "deck_id": 5,
      "user_id": 5,
      "deck_name": "Basic General Knowledge",
      "public": true,
      "created_at": "2020-01-16T19:12:08.774Z",
      "updated_at": "2020-01-16T19:12:08.774Z",
      "accessed_time": "2020-01-16T19:34:09.450Z"
    },
    {
      "deck_id": 5,
      "user_id": 5,
      "deck_name": "Basic General Knowledge",
      "public": true,
      "created_at": "2020-01-16T19:12:08.774Z",
      "updated_at": "2020-01-16T19:12:08.774Z",
      "accessed_time": "2020-01-16T19:34:09.483Z"
    }
  ]
}
```

#### PUT /api/decks/access/:id

_**Description**: Update access time on a users deck._.

Request body:

```json
{}
```

Response body:

```json
{}
```

#### DELETE /api/decks/access/:id

_**Description**: Delete access connection from user to deck._.

Request body:

```json
{}
```

Response body:

```json
{}
```

#### GET /api/decks/favorite

_**Description**: Get favorite tags._.

Request body:

```json
{}
```

Response body:

```json
[
  {
    "name": "Accounting & Finance",
    "value_occurrence": "3"
  },
  {
    "name": "Aeronautical & Manufacturing Engineering",
    "value_occurrence": "2"
  },
  {
    "name": "Agriculture & Forestry",
    "value_occurrence": "1"
  },
  {
    "name": "American Studies",
    "value_occurrence": "1"
  },
  {
    "name": null,
    "value_occurrence": "0"
  }
]
```

## Flashcards

#### POST /api/cards/

_**Description**: Creates a flashcard in a deck._.

Request body:

```json
{
  "deckId": 1,
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

#### GET /api/cards/

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
{}
```

#### GET /api/cards/COTD

_**Description**: Delete a flashcard._.

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

## The Tag Data We Used

Please go to data > seeds > 03-tags-data.js to view the tags we used

## Technologies

- Node | Express | hapi/joi | bcryptjs | cors | knex | Postgres | Jest | Supertest | jsonwebtoken
