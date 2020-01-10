 

 const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password} = req.body;
  if(!email || !name || !password){
    return res.status(400).json('incorrect form submissin');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .then(() => {
    return trx('users')
       .insert({
        email: email,
        name: name,
        joined: new Date()
      })
       .then(user => {
        db('users').where('id', user).then(result => {
          res.json(result[0]);
          })
        })
      })
    .then(trx.commit)
    .catch(trx.rollback)
    })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister 
}