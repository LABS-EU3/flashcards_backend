const { remove, getUserRanking, topRated } = require('./model');

exports.deleteUser = async (req, res) => {
  try {
    const { subject } = req.decodedToken;
    const { id } = req.params;

    // eslint-disable-next-line radix
    if (parseInt(id) !== subject) {
      res.status(403).json({ message: 'Request is forbidden' });
      return;
    }

    await remove(id);
    res.status(200).json({ message: 'user successfully deleted' });
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
    res.status(500).json({ message: 'Failed to fetch leaderboard.' });
  }
};
