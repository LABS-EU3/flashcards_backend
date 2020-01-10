const { findById } = require('../decks/model');

exports.deckExists = async (req, res, next) => {
  const { id } = req.params;
  const deck = await findById(id);

  if (!deck) {
    res.status(404).json({
      status: 404,
      message: 'Deck ID does not exist',
    });
  }

  next();
};
