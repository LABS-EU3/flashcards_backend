const { findById, findTagByName, findDeckTag } = require('../decks/model');

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
        const tagObject = await findTagByName(tag);
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
        const tagObject = await findTagByName(tag);
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
    message: `One of your tags are not valid`,
  });
};

exports.preventDuplicateTags = async (req, res, next) => {
  const { addTags } = req.body;
  const { id } = req.params;
  let hasTags;
  try {
    if (addTags) {
      const results = await Promise.all(
        addTags.map(async tag => {
          const tagObject = await findTagByName(tag);
          const isExist = await findDeckTag(tagObject[0].id, id);
          if (Object.getOwnPropertyNames(isExist).length > 2) {
            return 1;
          }
          return undefined;
        })
      );
      hasTags = results.find(result => result === 1);
    }
    if (hasTags === undefined) {
      return next();
    }
    return res.status(500).json({
      message: `One of your tags already exists`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `One of your tags are not valid`,
    });
  }
};
