const express = require('express');

const { createCard } = require('./flashcardsController');
const { createCardSchema } = require('./flashcardsSchema');
const validate = require('../../utils/validate');
// const {} = require('./flashcardsMiddlewares');

const flashcardsRouter = express.Router();

flashcardsRouter.post('/register', validate(createCardSchema), createCard);

module.exports = flashcardsRouter;
