import { MongoClient } from 'mongodb';

// to do : regroup call to mongodb in one folder with JWT
export default async (req, res) => {
   try {
       //Connect with database
       const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();

        const articles = await db
           .collection("articles")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       res.json(articles);
   } catch (e) {
       console.error(e);
   }
};