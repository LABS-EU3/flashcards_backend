// const { } = require('../../config');
const { createCard } = require('./flashcardsModel');

const makeCard = async (req, res) => {
  try {
    const card = await createCard(req.body);
    res
      .status(500)
      .json({ message: `Successfully created card with the id of ${card.id}` });
  } catch (error) {
    res.status(500).json({ message: `Failed to to create flashcard` });
  }
};

module.exports = {
  makeCard,
};
