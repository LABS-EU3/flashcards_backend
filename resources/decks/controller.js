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
      const foundDeck = deck ? [deck] : [];
      res.status(200).json({ status: 200, data: foundDeck });
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: 500, error: `Error getting deck: ${error.message}` });
    });
};

exports.addDeck = (req, res) => {
  const { name } = req.body;
  const { subject } = req.decodedToken;
  const newDeck = {
    name,
    user_id: subject,
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

  if (Number.isNaN(Number(id))) {
    res.status(400).json({ status: 400, messagee: 'Invalid deck ID' });
  }

  Decks.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({
          status: 200,
          data: [{ message: 'Deck has been deleted', id }],
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `Could not find deck with ID -  ${id} `,
        });
      }
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
