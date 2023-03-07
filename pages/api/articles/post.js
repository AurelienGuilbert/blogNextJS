import { MongoClient } from 'mongodb';

async function handler(req, res) {
  console.log('post server side 1');
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        console.log('post server side');
        //Getting email and password from body
        const { author, title, content } = req.body;

        //Connect with database
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();

        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ email: author });

            //pass author objectid
        if (checkExisting) {
          //Create
          const authorId = checkExisting._id
          console.log(authorObject);

          const status = await db.collection('articles').insertOne({
            authorId,
            title,
            content,
          });
          //Send success response
          res.status(201).json({ message: 'post created', ...status });
          //Close DB connection
          client.close(); 
        } else {
          //Response for other than POST method
          res.status(500).json({ message: 'no user found' });
        }

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;