const { remove, getUserRanking, topRated } = require('./model');

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await remove(id);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserScore = async (req, res) => {
  try {
    const { subject } = req.decodedToken;
    const [user, score] = await getUserRanking(subject);

    const userWithScore = {
      ...score,
      ...user,
    };
    if (userWithScore.score === undefined) {
      userWithScore.score = 0;
    }
    res.status(200).json({
      message: `Successfully fetched User score`,
      data: userWithScore,
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch score.` });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await topRated();

    res.status(200).json({ message: 'Fetched leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch leaderboard.` });
  }
};
