// secure this route ?
const jwt = require('jsonwebtoken');

async function Token(user) {
  const accessToken = jwt.sign( {name: user}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60});
  return accessToken
}

export default Token;