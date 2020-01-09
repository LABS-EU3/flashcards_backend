const { findById } = require('../decks/model');

exports.deckExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    await findById(id);
    next();
  } catch (error) {
    res.status(500).json({
      message: `Unable to process id`,
    });
  }
};
