// Deck controller

const Decks = require('./model');

exports.getAllDecks = async (req, res) => {
  const decks = await Decks.getAll();
  res.status(200).json({ status: 200, data: decks });
};

exports.getDeck = (req, res) => {
  const { id } = req.params;

  Decks.findById(id)
    .then(async deck => {
      res.status(200).json({ status: 200, data: [deck] });
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: 500, error: `Error getting deck: ${error.message}` });
    });
};

exports.addDeck = (req, res) => {
  const { name } = req.body;
  const newDeck = {
    name,
  };

  Decks.add(newDeck)
    .then(deck => {
      res.status(201).json({ status: 200, data: deck });
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: 500, error: `Error adding deck: ${error}` });
    });
};

exports.deleteDeck = (req, res) => {
  const { id } = req.params;
  Decks.remove(id)
    .then(() => {
      res.status(200).json({
        status: 200,
        data: [{ message: 'Deck has been deleted', id }],
      });
    })
    .catch(error => {
      res.status(500).json({
        status: 500,
        error: `Error deleting deck: ${error.message}`,
      });
    });
};

exports.updateDeck = (req, res) => {
  const { id } = req.params;

  Decks.update(req.body, id)
    .then(async () => {
      const deck = await Decks.findById(Number(id));
      res.status(200).json({ status: 200, data: [deck] });
    })
    .catch(error => {
      res.status(500).json({
        status: 500,
        error: `Error updating deck: ${error.message}`,
      });
    });
};
