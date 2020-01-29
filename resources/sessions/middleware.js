const { findByReview, findSessionById } = require('./model');
const { getCardById } = require('../flashcards/model');
const { findById } = require('../decks/model');

exports.sesssionExists = async (req, res, next) => {
  const { sessionId } = req.params;
  try {
    const sessionExists = await findSessionById(sessionId);
    if (sessionExists) {
      next();
    } else {
      res.status(404).json({ message: `Session does not exists ` });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: `Session does not exists ${error.message}` });
  }
};

exports.deckExists = async (req, res, next) => {
  const { deckId } = req.body;
  try {
    const deckExists = await findById(deckId);
    if (deckExists) {
      next();
    } else {
      res.status(404).json({
        message: `Deck does not exists`,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: `Deck does not exists  ${error.message}`,
    });
  }
};

exports.cardExists = async (req, res, next) => {
  const { cardIds } = req.body;
  try {
    if (cardIds) {
      await Promise.all(
        cardIds.map(async cardId => {
          try {
            await getCardById(cardId);
          } catch (error) {
            res.status(404).json({ message: `Flashcard not found ${cardId}` });
          }
        })
      );
    }
    next();
  } catch (error) {
    res.status(404).json({
      message: `Error checking cards exists ${error.message}`,
    });
  }
};

exports.cardAlreadyMarked = async (req, res, next) => {
  const { cardIds } = req.body;
  const { sessionId } = req.params;
  let markedCards;
  try {
    if (cardIds) {
      const results = await Promise.all(
        cardIds.map(async cardId => {
          const isMarked = await findByReview({
            card_id: cardId,
            session_id: sessionId,
          });
          if (isMarked === undefined) {
            return undefined;
          }
          return 1;
        })
      );
      markedCards = results.find(result => result === 1);
    }
    if (markedCards === undefined) {
      return next();
    }
    return res.status(500).json({
      message: `Card is already marked in session as reviewed`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error checking cards have been marked ${error.message}`,
    });
  }
};

exports.cardBelongsToDeck = async (req, res, next) => {
  const { cardIds } = req.body;
  const { sessionId } = req.params;
  let cardNotBelong;
  try {
    if (cardIds) {
      const results = await Promise.all(
        cardIds.map(async cardId => {
          const session = await findSessionById(sessionId);
          const deck = await findById(session.deck_id);
          const card = await getCardById(cardId);
          if (deck.deck_id === card.deck_id) {
            return undefined;
          }
          return 1;
        })
      );
      cardNotBelong = results.find(result => result === 1);
    }
    if (cardNotBelong === undefined) {
      return next();
    }
    return res.status(500).json({
      message: `Card does not belong to this session, does not exists in deck`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error checking cards belong to session${error.message}`,
    });
  }
};
