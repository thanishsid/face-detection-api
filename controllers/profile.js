const handleProfile = (db) => (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('No such user');
      }
    })
    .catch((err) => res.status(400).json('Failed to get user'));
};

module.exports = {
  handleProfile: handleProfile,
};
