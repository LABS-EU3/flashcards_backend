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

| ENDPOINT                                                       | DESCRIPTION             |
| -------------------------------------------------------------- | ----------------------- |
| [GET /](#get)                                                  | Base URL                |
| [POST /api/auth/register](#post-apiauthregister)               | Register new User       |
| [POST /api/auth/login](#post-apiauthlogin)                     | Login for User          |
| [POST /api/auth/confirm_email](#post-apiauthconfirm_email)     | Confirm Email for User  |
| [POST /api/auth/forgot_password](#post-apiauthforgot_password) | Request reset token     |
| [POST /api/auth/reset_password](#post-apiauthreset_password)   | Reset password          |
| [GET /api/auth/google/](#get-apiauthgoogle)                    | Redirect to google auth |
| [POST /api/auth/google/:token](#post-apiauthgoogleToken)       | Confirms auth & login   |
| [POST /api/auth/update_password](#post-apiauthupdate_password) | Update password         |
| [POST /api/auth/uploadProfile_img](#update-userprofileimg)     | Update Profile Image    |
| -------------------------------------------------------------- | ----------------------  |
| [POST /api/decks](#post-apidecks)                              | Create deck             |
| [GET /api/decks](#get-apidecks)                                | All decks of User       |
| [GET /api/decks/public](#get-apideckspublic)                   | all public decks        |
| [GET /api/decks/:id](#get-apidecksId)                          | View one deck           |
| [PUT /api/decks/:id](#put-apidecksId)                          | Edit deck               |
| [DELETE /api/decks/:id](#delete-apidecksId)                    | Delete deck             |
| [GET /api/decks/favorite](#get-apideckstag)                    | Get most used tags      |
| [GET /api/decks/access/](#put-apidecksaccess)                  | 3  decks last accessed  |
| [PUT /api/decks/access/:id](#put-apidecksaccessId)             | Update deck access time |
| [DELETE /api/decks/access/:id](#put-apidecksaccessId)          | Remove accessed entry   |
| -------------------------------------------------------------- | ----------------------  |
| [POST /api/cards](#post-apicards)                              | Create Flashcard        |
| [GET /api/cards](#get-apicards)                                | All flashcards of User  |
| [GET /api/cards/:id](#get-apicardsId)                          | View one flashcard      |
| [PUT /api/cards/:id](#put-apicardsId)                          | Edit flashcard          |
| [DELETE /api/cards/:id](#delete-apicardsId)                    | Delete flashcard        |
| [GET /api/cards/COTD](#get-apicardsCOTD)                       | Get card of the Day     |
| [POST /api/cards/scoring](#post-apicardsscoring)               | Rate card for user      |
| -------------------------------------------------------------- | ----------------------- |
| [POST /api/feedback](#post-apifeedback)                        | Send feedback           |
| -------------------------------------------------------------- | ----------------------  |
| [GET /api/users/:id/score](#get-apiusersIdscore)               | Get single user's score |
| [GET /api/users/leaderboard](#get-apiusersleaderboard)         | Get top scoring users   |
| [PUT  /api/users/updateprofile](#update-userprofilename)       | Update Profile          |
| [DELETE /api/users](#delete-apideleteuser)                     | Delete User             |
| -------------------------------------------------------------- | ----------------------  |
| [POST /api/sessions](#post-apisessions)                        | Create session          |
| [GET /api/sessions](#get-apisessions)                          |3    sessions of User    |
| [GET /api/sessions/:id](#get-apisessionsId)                    | View one session        |
| [PUT /api/sessions/:id](#put-apisessionsId)                    | Edit session            |
| [DELETE /api/sessions/:id](#delete-apisessionsId)              | Delete session          |



 
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

#### GET /api/auth/google

_**Description**: Redirects user to google auth, user will signin or cannot and will be redirected back to the landing page._.

Request body:

```json
{}
```

Response body:

```json
{}
```

#### POST /api/auth/google/:token

_**Description**: User will be verified in the data based as created and will be sent a token with userID._.

Request body:

```json
{}
```

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

#### POST /api/auth/update_Password

_**Description**: Updates a user's password._.

Request body:

```json
{
  "newPassword": "my new password",
  "confirmPassword": "matches my new password"
}
```

```json
{
  "message": "Password updated successfully"
}
```

#### POST api/auth/uploadProfile_img

_**Description**: It stores image url on the db(users table)._.

Request body:

```json
{
  "imageUrl": "this-is-a-test"
}
```

Response body:

```json
{
  "message": "Image url stored successfully"
}
```
#### POST api/users/updateprofile

_**Description**: It updates users profile on the db(users table)._.

Request body:

```json
{
  "fullName": "updated fullName"
}
```

Response body:

```json
{
    "message": "Profile updated successfully"
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
      "deck_id": 5,
      "user_id": 5,
      "deck_name": "Basic General Knowledge",
      "public": true,
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "tags": [
        {
          "id": 10,
          "name": "Aural & Oral Sciences"
        },
        {
          "id": 11,
          "name": "Biological Sciences"
        }
      ],
      "flashcards": [
        {
          "id": 9,
          "deck_id": 5,
          "user_id": 5,
          "question": "Grand Central Terminal, Park Avenue, New York is the world...?",
          "answer": "largest railway station",
          "image_url_question": "https://res.cloudinary.com/quick-decks/image/upload/v1580472083/flashcard_front_13.jpg",
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": "https://res.cloudinary.com/quick-decks/image/upload/v1580472154/flashcard_front_13.png"
        },
        {
          "id": 10,
          "deck_id": 5,
          "user_id": 5,
          "question": "For which of the following disciplines is Nobel Prize awarded?",
          "answer": "Physics and Chemistry, Physiology or Medicine, Literature, Peace and Economics",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 8,
      "user_id": 5,
      "deck_name": "rich",
      "public": false,
      "created_at": "2020-01-30T08:58:24.174Z",
      "updated_at": "2020-01-30T08:58:24.174Z",
      "tags": [null],
      "flashcards": [null]
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
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "tags": [
        {
          "id": 1,
          "name": "Accounting & Finance"
        },
        {
          "id": 2,
          "name": "Aeronautical & Manufacturing Engineering"
        }
      ],
      "flashcards": [
        {
          "id": 1,
          "deck_id": 1,
          "user_id": 1,
          "question": "What is data mining?",
          "answer": "Its when biotech and infotech merge and people become data mines",
          "image_url_question": null,
          "created_at": "2020-01-08T05:44:38.761-05:00",
          "updated_at": "2020-01-08T05:44:38.761-05:00",
          "image_url_answer": null
        },
        {
          "id": 2,
          "deck_id": 1,
          "user_id": 1,
          "question": "Hey Anna hehe sup",
          "answer": "How you doing?",
          "image_url_question": null,
          "created_at": "2020-01-08T05:45:05.269-05:00",
          "updated_at": "2020-01-08T05:45:05.269-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 3,
      "user_id": 3,
      "deck_name": "Technology ",
      "public": true,
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "tags": [
        {
          "id": 6,
          "name": "Anthropology"
        },
        {
          "id": 7,
          "name": "Archaeology"
        }
      ],
      "flashcards": [
        {
          "id": 5,
          "deck_id": 3,
          "user_id": 3,
          "question": "In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
          "answer": "1880s",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        },
        {
          "id": 6,
          "deck_id": 3,
          "user_id": 3,
          "question": "What is part of a database that holds only one type of information?",
          "answer": "Field",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 4,
      "user_id": 4,
      "deck_name": "Biology ",
      "public": true,
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "tags": [
        {
          "id": 8,
          "name": "Architecture"
        },
        {
          "id": 9,
          "name": "Art & Design"
        }
      ],
      "flashcards": [
        {
          "id": 7,
          "deck_id": 4,
          "user_id": 4,
          "question": "Ordinary table salt is sodium chloride. What is baking soda?",
          "answer": "Sodium bicarbonate",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        },
        {
          "id": 8,
          "deck_id": 4,
          "user_id": 4,
          "question": "Plants receive their nutrients from the?",
          "answer": "Sun",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 5,
      "user_id": 5,
      "deck_name": "Basic General Knowledge",
      "public": true,
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "tags": [
        {
          "id": 10,
          "name": "Aural & Oral Sciences"
        },
        {
          "id": 11,
          "name": "Biological Sciences"
        }
      ],
      "flashcards": [
        {
          "id": 9,
          "deck_id": 5,
          "user_id": 5,
          "question": "Grand Central Terminal, Park Avenue, New York is the world...?",
          "answer": "largest railway station",
          "image_url_question": "https://res.cloudinary.com/quick-decks/image/upload/v1580472083/flashcard_front_13.jpg",
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": "https://res.cloudinary.com/quick-decks/image/upload/v1580472154/flashcard_front_13.png"
        },
        {
          "id": 10,
          "deck_id": 5,
          "user_id": 5,
          "question": "For which of the following disciplines is Nobel Prize awarded?",
          "answer": "Physics and Chemistry, Physiology or Medicine, Literature, Peace and Economics",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 6,
      "user_id": 6,
      "deck_name": "Famous Personalities",
      "public": true,
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
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
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        },
        {
          "id": 12,
          "deck_id": 6,
          "user_id": 6,
          "question": "The Indian to beat the computers in mathematical wizardry is",
          "answer": "Shakunthala Devi",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 5,
      "user_id": 5,
      "deck_name": "Basic General Knowledge",
      "public": true,
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "tags": [
        {
          "id": 10,
          "name": "Aural & Oral Sciences"
        },
        {
          "id": 11,
          "name": "Biological Sciences"
        }
      ],
      "flashcards": [
        {
          "id": 9,
          "deck_id": 5,
          "user_id": 5,
          "question": "Grand Central Terminal, Park Avenue, New York is the world...?",
          "answer": "largest railway station",
          "image_url_question": "https://res.cloudinary.com/quick-decks/image/upload/v1580472083/flashcard_front_13.jpg",
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": "https://res.cloudinary.com/quick-decks/image/upload/v1580472154/flashcard_front_13.png"
        },
        {
          "id": 10,
          "deck_id": 5,
          "user_id": 5,
          "question": "For which of the following disciplines is Nobel Prize awarded?",
          "answer": "Physics and Chemistry, Physiology or Medicine, Literature, Peace and Economics",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 8,
      "user_id": 5,
      "deck_name": "rich",
      "public": false,
      "created_at": "2020-01-30T08:58:24.174Z",
      "updated_at": "2020-01-30T08:58:24.174Z",
      "tags": [null],
      "flashcards": [null]
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
        "image_url_question": null,
        "created_at": "2020-01-13T10:49:59.086613-05:00",
        "updated_at": "2020-01-13T10:49:59.086613-05:00",
        "image_url_answer": null
      },
      {
        "id": 12,
        "deck_id": 6,
        "user_id": 6,
        "question": "The Indian to beat the computers in mathematical wizardry is",
        "answer": "Shakunthala Devi",
        "image_url_question": null,
        "created_at": "2020-01-13T10:49:59.086613-05:00",
        "updated_at": "2020-01-13T10:49:59.086613-05:00",
        "image_url_answer": null
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
      "image_url_question": null,
      "created_at": "2020-01-13T10:49:59.086613-05:00",
      "updated_at": "2020-01-13T10:49:59.086613-05:00",
      "image_url_answer": null
    },
    {
      "id": 12,
      "deck_id": 6,
      "user_id": 6,
      "question": "The Indian to beat the computers in mathematical wizardry is",
      "answer": "Shakunthala Devi",
      "image_url_question": null,
      "created_at": "2020-01-13T10:49:59.086613-05:00",
      "updated_at": "2020-01-13T10:49:59.086613-05:00",
      "image_url_answer": null
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
      "created_at": "2020-01-29T15:39:24.335Z",
      "updated_at": "2020-01-29T15:39:24.335Z",
      "accessed_time": "2020-01-29T15:39:24.357Z",
      "flashcards": [
        {
          "id": 9,
          "deck_id": 5,
          "user_id": 5,
          "question": "Grand Central Terminal, Park Avenue, New York is the world...?",
          "answer": "largest railway station",
          "image_url_question": "https://res.cloudinary.com/quick-decks/image/upload/v1580472083/flashcard_front_13.jpg",
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": "https://res.cloudinary.com/quick-decks/image/upload/v1580472154/flashcard_front_13.png"
        },
        {
          "id": 10,
          "deck_id": 5,
          "user_id": 5,
          "question": "For which of the following disciplines is Nobel Prize awarded?",
          "answer": "Physics and Chemistry, Physiology or Medicine, Literature, Peace and Economics",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ]
    },
    {
      "deck_id": 8,
      "user_id": 5,
      "deck_name": "rich",
      "public": false,
      "created_at": "2020-01-30T08:58:24.174Z",
      "updated_at": "2020-01-30T08:58:24.174Z",
      "accessed_time": "2020-01-30T08:58:24.185Z",
      "flashcards": [null]
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
  "deckId": 2,
  "questionText": "How do I create a flashcard",
  "answerText": "Post to /api/card",
  "imageUrlQuestion": "www.realurl.com",
  "imageUrlAnswer": "www.google.com"
}
```

Required: deckId: int, userId: int, questionText: String, answertText: String

Response body:

```json
{
  "id": 20,
  "deck_id": 2,
  "user_id": 2,
  "question": "How do I create a flashcard",
  "answer": "Post to /api/card",
  "image_url_question": "www.realurl.com",
  "created_at": "2020-01-22T13:47:57.348Z",
  "updated_at": "2020-01-22T13:47:57.348Z",
  "image_url_answer": "www.google.com"
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
    "image_url_question": null,
    "created_at": "2020-01-08T10:44:38.761Z",
    "updated_at": "2020-01-08T10:44:38.761Z",
    "image_url_answer": null
  },
  {
    "id": 3,
    "deck_id": 1,
    "user_id": 1,
    "question": "here is my question answer me",
    "answer": "here is my answer question me",
    "image_url_question": null,
    "created_at": "2020-01-08T10:45:05.269Z",
    "updated_at": "2020-01-08T10:45:05.269Z",
    "image_url_answer": null
  },
  {
    "id": 5,
    "deck_id": 1,
    "user_id": 1,
    "question": "here is my question answer me",
    "answer": "here is my answer question me",
    "image_url_question": null,
    "created_at": "2020-01-08T11:34:52.174Z",
    "updated_at": "2020-01-08T11:34:52.174Z",
    "image_url_answer": null
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
  "image_url_question": null,
  "created_at": "2020-01-08T10:45:05.269Z",
  "updated_at": "2020-01-08T10:45:05.269Z",
  "image_url_answer": null
}
```

#### PUT /api/cards/:id

_**Description**: Edit a flashcard by flashcard Id._.

Request body:

```json
{
  "deckId": 2,
  "questionText": "updated question",
  "answerText": "updated question",
  "imageUrlQuestion": "www.gify.com/image",
  "imageUrlAnswer": "www.google.com"
}
```

Response body:

```json
{
  "id": 17,
  "deck_id": 2,
  "user_id": 2,
  "question": "updated question",
  "answer": "updated question",
  "image_url_question": "www.gify.com/image",
  "created_at": "2020-01-22T13:14:26.879Z",
  "updated_at": "2020-01-22T13:14:26.879Z",
  "image_url_answer": "www.google.com"
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

_**Description**: Get Card of The Day._.

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
  "image_url_question": null,
  "created_at": "2020-01-08T10:45:05.269Z",
  "updated_at": "2020-01-08T10:45:05.269Z",
  "image_url_answer": null
}
```

#### POST /api/cards/scoring

_**Description**: Score single flashcard when user in study mode._.

Request body:

```json
{
  "card_id": 1,
  "deck_id": 3,
  "rating": 5
}
```

Response body:

```json
{
  "message": "Successfully scored"
}
```

## Users

#### GET api/users/:id/score

_**Description**: Get a single user's score._.

Request body:

```json
{}
```

Response body:

```json
{
  "message": "Successfully fetched User score",
  "data": {
    "score": 10,
    "email": "maaruf@xyz.com",
    "full_name": "John Doe",
    "id": 8
  }
}
```

#### GET api/users/leaderboard

_**Description**: Get top 15 scoring users._.

Request body:

```json
{}
```

Response body:

```json
{
  "message": "Fetched leaderboard",
  "data": [
    {
      "user_id": 8,
      "full_name": "Maaruf Doe",
      "email": "maaruf@xyz.com",
      "score": 10
    },
    {
      "user_id": 9,
      "full_name": "Anna Doe",
      "email": "anna@xyz.com",
      "score": 5
    }
  ]
}
```

#### DELETE /api/users/

_**Description**: Delete a user._.

Request body:

```json
{
  "password": "this-is-a-password"
}
```

Response body:

```json
{
  "message": "User successfully deleted"
}
```

## POST /api/feedback

_**Description**: Sends user feedback to the user's email and the QuickDecks email_.

Request body:

```json
{
  "feedback": "Hello there. I love using this app - its so great! Can I send this feedback to you?"
}
```

Response body

```json
{
  "message": "User feedback sent successfully",
  "data": {
    "feedback": "Hello there. I love using this app - its so great! Can I send this feedback to you?"
  }
}
```

Required: feedback: string

## Sessions

#### POST /api/sessions/

Request body:

```json
{
  "deckId": 5
}
```

Response body:

```json
{
  "session": {
    "id": 24,
    "deck_id": 8,
    "user_id": 5,
    "isCompleted": false,
    "last_used": "2020-01-30T09:23:33.275Z",
    "reviewed_cards": [null],
    "flashcards": [null]
  }
}
```

_**Description**: Creates a session._.

#### GET /api/sessions/

_**Description**: Retrieves all sessions made by a specific User_.

Request body:

```json
{}
```

Response body:

```json
{
  "data": [
    {
      "id": 9,
      "deck_id": 5,
      "user_id": 5,
      "isCompleted": false,
      "last_used": "2020-01-29T16:10:41.208Z",
      "reviewed_cards": [null],
      "flashcards": [
        {
          "id": 9,
          "deck_id": 5,
          "user_id": 5,
          "question": "Grand Central Terminal, Park Avenue, New York is the world...?",
          "answer": "largest railway station",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        },
        {
          "id": 10,
          "deck_id": 5,
          "user_id": 5,
          "question": "For which of the following disciplines is Nobel Prize awarded?",
          "answer": "Physics and Chemistry, Physiology or Medicine, Literature, Peace and Economics",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ],
      "cards_left": 2
    },
    {
      "id": 10,
      "deck_id": 5,
      "user_id": 5,
      "isCompleted": false,
      "last_used": "2020-01-29T16:56:59.995Z",
      "reviewed_cards": [
        {
          "id": 10,
          "session_id": 10,
          "card_id": 1
        },
        {
          "id": 11,
          "session_id": 10,
          "card_id": 2
        }
      ],
      "flashcards": [
        {
          "id": 9,
          "deck_id": 5,
          "user_id": 5,
          "question": "Grand Central Terminal, Park Avenue, New York is the world...?",
          "answer": "largest railway station",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        },
        {
          "id": 10,
          "deck_id": 5,
          "user_id": 5,
          "question": "For which of the following disciplines is Nobel Prize awarded?",
          "answer": "Physics and Chemistry, Physiology or Medicine, Literature, Peace and Economics",
          "image_url_question": null,
          "created_at": "2020-01-29T10:39:24.340918-05:00",
          "updated_at": "2020-01-29T10:39:24.340918-05:00",
          "image_url_answer": null
        }
      ],
      "cards_left": 0
    },

    {
      "id": 24,
      "deck_id": 8,
      "user_id": 5,
      "isCompleted": false,
      "last_used": "2020-01-30T09:23:33.275Z",
      "reviewed_cards": [null],
      "flashcards": [null],
      "cards_left": 0
    }
  ]
}
```

#### GET /api/sessions/:id

_**Description**: Retrieves a specific session by the session's id._.

Request body:

```json
{}
```

Response body:

```json
{
  "session": {
    "id": 5,
    "deck_id": 5,
    "user_id": 5,
    "isCompleted": false,
    "last_used": "2020-01-29T15:39:24.363Z",
    "reviewed_cards": [
      {
        "id": 5,
        "session_id": 5,
        "card_id": 9
      }
    ]
  }
}
```

#### PUT /api/sessions/:id

_**Description**: Edit a session by session Id, you can also send a blank request just to update lastused ._.

Request body:

```json
{
  "isCompleted": true,
  "cardIds": [10]
}
```

Response body:

```json
{
  "session": {
    "id": 6,
    "deck_id": 6,
    "user_id": 6,
    "isCompleted": false,
    "last_used": "2020-01-29T15:39:24.363Z",
    "reviewed_cards": [
      {
        "id": 6,
        "session_id": 6,
        "card_id": 11
      }
    ],
    "flashcards": [
      {
        "id": 11,
        "deck_id": 6,
        "user_id": 6,
        "question": "Who is the father of Geometry?",
        "answer": "Euclid",
        "image_url_question": null,
        "created_at": "2020-01-29T10:39:24.340918-05:00",
        "updated_at": "2020-01-29T10:39:24.340918-05:00",
        "image_url_answer": null
      },
      {
        "id": 12,
        "deck_id": 6,
        "user_id": 6,
        "question": "The Indian to beat the computers in mathematical wizardry is",
        "answer": "Shakunthala Devi",
        "image_url_question": null,
        "created_at": "2020-01-29T10:39:24.340918-05:00",
        "updated_at": "2020-01-29T10:39:24.340918-05:00",
        "image_url_answer": null
      }
    ],
    "cards_left": 1
  }
}
```

#### DELETE /api/sessions/:id

_**Description**: Delete a session._.

Request body:

```json
{}
```

Response body:

```json
{}
```

## The Tag Data We Used

Please go to data > seeds > 03-tags-data.js to view the tags we used

## Technologies

- Node | Express | hapi/joi | bcryptjs | cors | knex | Postgres | Jest | Supertest | jsonwebtoken
