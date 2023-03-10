import mongoConnect from "../../../config/mongoConnect";

// to do : regroup call to mongodb in one folder with JWT
export default async (req, res) => {
   try {
       //Connect with database
       const client = await mongoConnect();
        const db = client.db();

        const articles = await db
           .collection("articles")
           .find({})
           .sort({ metacritic: -1 })
           .limit(6)
           .toArray();

       res.send(articles);
   } catch (e) {
       console.error(e);
   }
};