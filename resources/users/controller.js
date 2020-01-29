const Users = require('./model');

exports.deleteUser = async (req, res) => {
  try {
    const { subject } = req.decodedToken;
    const { id } = req.params;

    if (id !== subject) {
      res.status(403).json({ message: 'Request is forbidden' });
      return;
    }

    await Users.remove(id);
    res.status(200).json({ message: 'user successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
