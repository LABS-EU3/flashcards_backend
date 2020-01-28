const { getCardById, checkCardIsRated } = require('./model');

exports.cardExists = async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    const card = await getCardById(id);
    if (card) {
      req.card = card;
      return next();
    }
  }

  return res.status(404).json({
    message: 'Flashcard does not exist',
  });
};

exports.userOwnsCard = async (req, res, next) => {
  const { id } = req.params;
  const { subject } = req.decodedToken;

  if (id) {
    const card = await getCardById(id);
    if (card.user_id === subject) {
      return next();
    }
    return res.status(404).json({
      message: 'You do not own the flashcard to make these changes',
    });
  }

  return res.status(404).json({
    message: 'Flashcard does not exist',
  });
};

exports.cardIsRated = async (req, res, next) => {
  const { subject } = req.decodedToken;

  const isRated = await checkCardIsRated({
    userId: subject,
    cardId: req.body.card_id,
  });

  if (isRated) req.isRated = true;
  else req.isRated = false;

  next();
};
