const { findById, findTagByName, findDeckTag } = require('../decks/model');

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
  const { removeTagsArray, addTagsArray } = req.body;
  let error;
  if (removeTagsArray) {
    const results = await Promise.all(
      removeTagsArray.map(async tag => {
        const tagObject = await findTagByName(tag);
        if (Object.getOwnPropertyNames(tagObject).length < 2) {
          return 1;
        }
        return undefined;
      })
    );
    error = results.find(result => result === 1);
  }
  console.log(error);
  if (addTagsArray) {
    const results = await Promise.all(
      addTagsArray.map(async tag => {
        const tagObject = await findTagByName(tag);
        if (Object.getOwnPropertyNames(tagObject).length < 2) {
          return 1;
        }
        return results;
      })
    );
    error = results.find(result => result === 1);
  }
  console.log(error);
  if (error === undefined) {
    return next();
  }
  return res.status(400).json({
    message: `One of your tags are not valid`,
  });
};

// doesnt work
exports.preventDuplicateTags = async (req, res, next) => {
  const { addTagsArray } = req.body;
  const { id } = req.params;
  try {
    if (addTagsArray) {
      const foundTags = [];
      Promise.all(
        addTagsArray.map(tag => {
          return findTagByName(tag).then(tagObject =>
            foundTags.concat(findDeckTag(tagObject[0].id, id))
          );
        })
      );
      if (foundTags > 1) {
        return res.status(500).json({
          message: `${foundTags} already exists on deck id ${id}`,
        });
      }
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      message: `One of your tags are not valid`,
    });
  }
};
