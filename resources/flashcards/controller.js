const {
  createCard,
  getCardById,
  getAllCardsByUser,
  removeCard,
  updateCard,
} = require('./model');

exports.fetchAllCardsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cards = await getAllCardsByUser(userId);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch all flashcards because 
      ${error.message}`,
    });
  }
};

exports.fetchCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await getCardById(id);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch flashcard because 
      ${error.message}`,
    });
  }
};

exports.makeCard = async (req, res) => {
  const { deckId, userId, questionText, answerText, imageUrl } = req.body;
  const cardInfo = {
    deck_id: deckId,
    user_id: userId,
    question: questionText,
    answer: answerText,
    image_url: imageUrl,
  };
  try {
    const card = await createCard(cardInfo);
    res
      .status(201)
      .json({ message: `Successfully created card with the id of ${card.id}` });
  } catch (error) {
    res.status(500).json({
      message: `Failed to create flashcard because 
      ${error.message}`,
    });
  }
};

exports.editCard = async (req, res) => {
  const { deckId, questionText, answerText, imageUrl } = req.body;
  const { id } = req.params;
  const cardInfo = {
    deck_id: deckId,
    question: questionText,
    answer: answerText,
    image_url: imageUrl,
  };
  try {
    const card = await updateCard(id, cardInfo);
    res
      .status(200)
      .json({ message: `Successfully updated card with the id of ${card.id}` });
  } catch (error) {
    res.status(500).json({
      message: `Failed to update flashcard because 
      ${error.message}`,
    });
  }
};

exports.deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    await removeCard(id);
    res.status(200).json({ message: `Successfully delete card with id ${id}` });
  } catch (error) {
    res.status(500).json({
      message: `Failed to delete flashcard because 
      ${error.message}`,
    });
  }
};
