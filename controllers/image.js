
const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '54870cd37df6416daceb58ea88d93b7a'
});

const handleApiCall = (req,res) => {
 app.models
 .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data => {
  res.json(data);
 })
 .catch(err => res.status(400).json('unable to work with API'));
}




const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries',1)
  .then(() => {
    db.select('entries').from('users').where('id',id).pluck('entries')
    .then(result => {
      res.json(result);
    })
  })
  .catch(err => res.status(400).json('unable to get entries'))
  
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall 
}