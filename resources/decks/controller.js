// Deck controller
const Decks = require('./model');

exports.getAllDecks = async (req, res) => {
  const { subject } = req.decodedToken;
  try {
    const publicDecks = await Decks.getAll();
    const usersDecks = await Decks.getUserDecks(subject);
    const decks = [...publicDecks, ...usersDecks];
    await res.status(200).json({ data: decks });
  } catch (error) {
    res.status(500).json({ message: `Error getting deck: ${error.message}` });
  }
};

exports.getUsersDecks = async (req, res) => {
  const { subject } = req.decodedToken;
  try {
    const decks = await Decks.getUserDecks(subject);
    res.status(200).json({ data: decks });
  } catch (error) {
    res.status(500).json({ message: `Error getting deck: ${error.message}` });
  }
};

exports.getDeck = async (req, res) => {
  const { id } = req.params;
  try {
    const deck = await Decks.findById(id);
    res.status(200).json({ deck });
  } catch (error) {
    res.status(500).json({ message: `Error getting deck: ${error.message}` });
  }
};

exports.addDeck = async (req, res) => {
  const { name, tags } = req.body;
  const { subject } = req.decodedToken;
  const newDeck = {
    name,
    user_id: subject,
  };
  try {
    const deck = await Decks.add(newDeck);
    if (tags) {
      await Promise.all(
        tags.map(async tag => {
          try {
            const newDeckTag = { deck_id: deck.id, tag_id: tag };
            Decks.addDeckTag(newDeckTag);
          } catch (error) {
            res.status(500).json({ message: `Error adding tag: ${tag}` });
          }
        })
      );
    }
    const accessCxnData = { user_id: subject, deck_id: deck.id };
    await Decks.createAccessConnection(accessCxnData);
    res.status(201).json({ deck });
  } catch (error) {
    res.status(500).json({ message: `Error adding deck: ${error}` });
  }
};

exports.deleteDeck = async (req, res) => {
  const { id } = req.params;
  try {
    await Decks.remove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Error deleting deck: ${error.message}`,
    });
  }
};

exports.updateDeck = async (req, res) => {
  const { subject } = req.decodedToken;
  const { id } = req.params;
  const { removeTags, addTags } = req.body;
  try {
    if (addTags || removeTags) {
      if (addTags) {
        await Promise.all(
          addTags.map(tag => {
            const newDeckTag = { deck_id: id, tag_id: tag };
            return Decks.addDeckTag(newDeckTag);
          })
        );
      }
      if (removeTags) {
        await Promise.all(
          removeTags.map(tag => {
            const deckTag = { deck_id: id, tag_id: tag };
            return Decks.removeDeckTag(deckTag);
          })
        );
      }
    }
    const accessCxnData = { user_id: subject, deck_id: id };
    await Decks.findAccessConnection(accessCxnData);
    await Decks.update({ name: req.body.name }, id);
    await Decks.deckUsed(id);
    const deck = await Decks.findById(Number(id));
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json({
      message: `Error updating deck: ${error.message}`,
    });
  }
};

exports.accessDeck = async (req, res) => {
  const { id } = req.params;
  const { subject } = req.decodedToken;
  const accessCxnData = { user_id: subject, deck_id: id };
  try {
    const foundCxn = await Decks.findAccessConnection(accessCxnData);
    if (foundCxn) {
      await Decks.deckAccessed(accessCxnData);
      res.status(200).end();
    }
    await Decks.createAccessConnection(accessCxnData);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({
      message: `Error updating deck access connection: ${error.message}`,
    });
  }
};

exports.recentlyAccessed = async (req, res) => {
  const { subject } = req.decodedToken;
  try {
    const decks = await Decks.getUserLastAccessed(subject);
    res.status(200).json({ data: decks });
  } catch (error) {
    res.status(500).json({
      message: `Error getting accessed deck: ${error.message}`,
    });
  }
};

exports.removeAccessed = async (req, res) => {
  const { id } = req.params;
  const { subject } = req.decodedToken;
  const accessCxnData = { user_id: subject, deck_id: id };
  try {
    await Decks.removeAccessConnection(accessCxnData);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Error removing access connection: ${error.message}`,
    });
  }
};
