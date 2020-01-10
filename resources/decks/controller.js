// Deck controller

const Decks = require('./model');

exports.getAllDecks = async (req, res) => {
  const decks = await Decks.getAll();
  res.status(200).json({ status: 200, data: decks });
};

exports.getUsersDeck = async (req, res) => {
  const { subject } = req.userAuthed;
  const decks = await Decks.getByUser(subject);
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

exports.addDeck = async (req, res, done) => {
  const { name, tagsArray } = req.body;
  const { subject } = req.userAuthed;
  const newDeck = {
    name,
    user_id: subject,
  };
  try {
    const deck = await Decks.add(newDeck);
    await tagsArray.map(async tag => {
      let deckTag;
      try {
        const tagObject = await Decks.findTagByName(tag);
        deckTag = Decks.addDeckTag({
          tag_id: tagObject[0].id,
          deck_id: deck[0].id,
        });
      } catch (error) {
        res
          .status(500)
          .json({ status: 500, error: `Error adding tag: ${tag}` });
      }
      return deckTag;
    });
    res.status(201).json({ status: 201, data: deck });
  } catch (error) {
    res.status(500).json({ status: 500, error: `Error adding deck: ${error}` });
    done();
  }
};

exports.deleteDeck = async (req, res) => {
  const { id } = req.params;
  try {
    await Decks.remove(id);
    res.status(200).json({
      status: 200,
      message: `Deck has been deleted ${id}`,
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
  const { name, removeTagsArray, addTagsArray } = req.body;
  try {
    if (removeTagsArray) {
      await removeTagsArray.map(tag => {
        return Decks.removeDeckTag({
          name: tag,
          deck_id: id,
        });
      });
    }
    if (addTagsArray) {
      await addTagsArray.map(tag => {
        return Decks.addDeckTag({
          name: tag,
          deck_id: id,
        });
      });
    }
    await Decks.update(name, id);
    const deck = await Decks.findById(Number(id));
    res.status(200).json({ status: 200, data: deck });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: `Error updating deck: ${error.message}`,
    });
  }
};
