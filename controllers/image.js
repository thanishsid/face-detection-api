const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '089e4835554246f0a7230eb24a4ad90d',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Unable to access API'));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entry) => res.json(entry[0]))
    .catch((err) => res.status(400).json('Failed to update entries'));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
