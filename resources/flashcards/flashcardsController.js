const { createCard } = require('./flashcardsModel');

const makeCard = async (req, res) => {
  const { deckId, userId, questionText, answerText } = req.body;
  const cardInfo = {
    deck_id: deckId,
    user_id: userId,
    question: questionText,
    answer: answerText,
  };
  try {
    const card = await createCard(cardInfo);
    res
      .status(500)
      .json({ message: `Successfully created card with the id of ${card.id}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to to create flashcard ${error.message}` });
  }
};

module.exports = {
  makeCard,
};
