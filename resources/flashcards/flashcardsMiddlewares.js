function validateCard(req, res, next) {
  const { deckId, userId, question, answer } = req.body;
  const card = { deckId, userId, question, answer };
  if (!Object.keys(req.body).length) {
    next({ message: 'Card data was not provided', status: 400 });
  }
  if (!card) {
    next({
      message:
        'Missing one of the required field: deck id, user id, question, answer',
      status: 401,
    });
  } else {
    next();
  }
}

module.exports = { validateCard };
