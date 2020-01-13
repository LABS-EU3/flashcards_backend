const { findById, findTagById } = require('../decks/model');

exports.deckExists = async (req, res, next) => {
  const { id } = req.params;
  const deck = await findById(id);

  if (deck) {
    next();
  } else {
    res.status(404).json({
      message: 'Deck ID does not exist',
    });
  }
};

exports.tagsExists = async (req, res, next) => {
  const { removeTags, addTags } = req.body;
  let error;
  if (removeTags) {
    const results = await Promise.all(
      removeTags.map(async tag => {
        const tagObject = await findTagById(tag);
        if (Object.getOwnPropertyNames(tagObject).length < 2) {
          return 1;
        }
        return undefined;
      })
    );
    error = results.find(result => result === 1);
  }
  if (addTags) {
    const results = await Promise.all(
      addTags.map(async tag => {
        const tagObject = await findTagById(tag);
        if (Object.getOwnPropertyNames(tagObject).length < 2) {
          return 1;
        }
        return undefined;
      })
    );
    error = results.find(result => result === 1);
  }
  if (error === undefined) {
    return next();
  }
  return res.status(400).json({
    message: `One of your tags does not exists`,
  });
};
