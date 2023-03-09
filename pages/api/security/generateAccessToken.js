// secure this route ?
const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
   
  const accessToken = jwt.sign( {name: username}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60});
  return accessToken
}

async function Token(req, res) {
  const { user } = req.body;
  console.log(user);
  const token = generateAccessToken(user)
  console.log(token);

  res.send(token)
}

export default Token;