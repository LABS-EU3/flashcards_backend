const Users = require('./model');

exports.deleteUser = async (req, res) => {
  try {
    const { subject } = req.decodedToken;
    const { id } = req.params;

    // const user = await model.findBy({ id: subject });
    console.log(typeof subject);
    console.log(typeof id);

    if (parseInt(id) !== subject) {
      res.status(403).json({ message: 'Request is forbidden' });
      return;
    }

    await Users.remove(id);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
