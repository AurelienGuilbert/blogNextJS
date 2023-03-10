import mongoConnect from "../../../config/mongoConnect";
import { ObjectId } from "mongodb";

// to do : regroup call to mongodb in one folder with JWT
export default async (req, res) => {
   try {
       //Connect with database
        const client = await mongoConnect();
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