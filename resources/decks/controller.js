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

exports.addDeck = async (req, res) => {
  const { name, tagsArray } = req.body;
  const { subject } = req.userAuthed;
  const newDeck = {
    name,
    user_id: subject,
  };
  try {
    const deck = await Decks.add(newDeck);
    await Promise.all(
      tagsArray.map(async tag => {
        let deckTag;
        try {
          const tagObject = await Decks.findTagByName(tag);
          deckTag = Decks.addDeckTag(tagObject[0].id, deck[0].id);
        } catch (error) {
          // Needs a test
          res
            .status(500)
            .json({ status: 500, error: `Error adding tag: ${tag}` });
        }
        return deckTag;
      })
    );
    return res.status(201).json({ status: 201, data: deck });
  } catch (error) {
    // Needs a test
    return res
      .status(500)
      .json({ status: 500, error: `Error adding deck: ${error}` });
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
    // Needs a test
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
    if (addTagsArray || removeTagsArray) {
      if (addTagsArray) {
        await Promise.all(
          addTagsArray.map(tag => {
            return Decks.findTagByName(tag).then(tagObject =>
              Decks.addDeckTag(tagObject[0].id, id)
            );
          })
        );
      }
      if (removeTagsArray) {
        await Promise.all(
          removeTagsArray.map(tag => {
            return Decks.findTagByName(tag).then(tagObject =>
              Decks.removeDeckTag(tagObject[0].id, id)
            );
          })
        );
      }
      await Decks.update(name, id);
      const deck = await Decks.findById(id);
      return res.status(200).json({ status: 200, data: deck });
    }
    await Decks.update(name, id);
    const deck = await Decks.findById(id);
    // needs a test
    return res.status(200).json({ status: 200, data: deck });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: `Error updating deck: ${err.message}`,
    });
  }
};
