const express = require('express');

const { makeCard } = require('./flashcardsController');
const { createCardSchema } = require('./flashcardsSchema');
const validate = require('../../utils/validate');
const { validateCard } = require('./flashcardsMiddlewares');

const flashcardsRouter = express.Router();

flashcardsRouter.post('/', validateCard, validate(createCardSchema), makeCard);

module.exports = flashcardsRouter;
