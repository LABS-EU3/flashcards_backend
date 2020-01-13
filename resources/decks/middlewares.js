const { findById } = require('./model');

exports.deckExists = async (req, res, next) => {
  const { id } = req.params;
  const deck = await findById(id);

  if (deck) {
    next();
  } else {
    res.status(404).json({
      message: 'Deck ID does not exist',
    });
  }
};
