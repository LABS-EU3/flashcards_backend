const {
  findSessionById,
  createSession,
  deleteSession,
  updateSession,
  getAllSessionsByUser,
  markCardReviewed,
} = require('./model');

exports.fetchSessionById = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await findSessionById(sessionId);
    res.status(200).json({ session });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to fetch session ${error.message}` });
  }
};

exports.makeSession = async (req, res) => {
  const { deckId } = req.body;
  const { subject } = req.decodedToken;
  const sessionData = {
    user_id: subject,
    deck_id: deckId,
  };
  try {
    const session = await createSession(sessionData);
    res.status(201).json({ session });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to create session ${error.message}` });
  }
};

exports.removeSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    await deleteSession(sessionId);
    res.status(204).end();
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to delete session ${error.message}` });
  }
};

exports.getUserSessions = async (req, res) => {
  const { subject } = req.decodedToken;
  try {
    const sessions = await getAllSessionsByUser(subject);
    res.status(200).json({ data: sessions });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to fetch user sessions ${error.message}` });
  }
};

exports.modifySession = async (req, res) => {
  const { isCompleted, cardIds } = req.body;
  const { sessionId } = req.params;
  try {
    if (cardIds) {
      await Promise.all(
        cardIds.map(async cardId => {
          try {
            const reviewedCard = {
              card_id: cardId,
              session_id: Number(sessionId),
            };
            await markCardReviewed(reviewedCard);
          } catch (error) {
            res.status(500).json({
              message: `Error making card reviewed ${cardId}, ${error.message}`,
            });
          }
        })
      );
    }
    if (isCompleted) {
      const session = await updateSession(sessionId, { isCompleted });
      res.status(200).json({ data: session });
    }
    const session = await findSessionById(sessionId);
    res.status(200).json({ session });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to update session ${error.message}` });
  }
};
