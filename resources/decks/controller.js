// Deck controller

const Decks = require('./model');

exports.getAllDecks = async (req, res) => {
  const decks = await Decks.getAll();
  res.status(200).json({ status: 200, data: decks });
};

exports.getDeck = async (req, res) => {
  const { id } = req.params;
  try {
    const deck = await Decks.findById(id);
    res.status(200).json({ status: 200, data: deck });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: `Error getting deck: ${error.message}` });
  }
};

exports.addDeck = async (req, res) => {
  const { name } = req.body;
  const { subject } = req.decodedToken;
  const newDeck = {
    name,
    user_id: subject,
  };
  try {
    const deck = await Decks.add(newDeck);
    res.status(201).json({ status: 201, data: deck });
  } catch (error) {
    res.status(500).json({ status: 500, error: `Error adding deck: ${error}` });
  }
};

exports.deleteDeck = async (req, res) => {
  const { id } = req.params;
  try {
    await Decks.remove(id);
    res.status(200).json({
      status: 200,
      data: [{ message: 'Deck has been deleted', id }],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: `Error deleting deck: ${error.message}`,
    });
  }
};

exports.updateDeck = async (req, res) => {
  const { id } = req.params;
  try {
    await Decks.update(req.body, id);
    const deck = await Decks.findById(Number(id));
    res.status(200).json({ status: 200, data: deck });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: `Error updating deck: ${error.message}`,
    });
  }
};
