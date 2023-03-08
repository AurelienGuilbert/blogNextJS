import { MongoClient } from 'mongodb';

async function MongoConnect(req, res) {
  //Connect with database
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  return client
}

export default MongoConnect;