const { findById, findDeckTagByName } = require('../decks/model');

exports.deckExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    await findById(id);
    next();
  } catch (error) {
    res.status(500).json({
      message: `Unable to process id`,
    });
  }
};

exports.tagsExists = async (req, res, next) => {
  const { removeTagsArray, addTagsArray, id } = req.body;
  try {
    if (removeTagsArray && addTagsArray) {
      await removeTagsArray.map(tag => {
        return findDeckTagByName(tag, id);
      });
      await addTagsArray.map(tag => {
        return findDeckTagByName(tag, id);
      });
      await next();
    }
    if (removeTagsArray || addTagsArray) {
      if (removeTagsArray) {
        await removeTagsArray.map(tag => {
          return findDeckTagByName(tag, id);
        });
        await next();
      }
      if (addTagsArray) {
        await addTagsArray.map(tag => {
          return findDeckTagByName(tag, id);
        });
        await next();
      }
    }
  } catch (error) {
    res.status(500).json({
      message: `One of your tags are not valid`,
    });
  }
};
