import { MongoClient } from 'mongodb';
import { ObjectId } from "mongodb";

// to do : regroup call to mongodb in one folder with JWT
export default async (req, res) => {
   try {
       //Connect with database
       const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();

        console.log(req.query.id);
        const articleIdObject = new ObjectId(req.query.id);
        console.log(articleIdObject);

        const article = await db
           .collection("articles")
           .findOne({_id: articleIdObject})

       res.send(article);
   } catch (e) {
       console.error(e);
   }
};