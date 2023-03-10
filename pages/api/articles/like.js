import mongoConnect from "../../../config/mongoConnect";
import { ObjectId } from "mongodb";

async function likeHandler(req, res) {
  // use middleware here for token check
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.NEXTAUTH_SECRET;

  if (token !== secret) {
    res.status(403).json({ message: "Token invalid" });
  }

  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log("post server side");

    //Getting email and password from body
    const { articleId } = req.body;

    // connexion to database
    const client = await mongoConnect();
    const db = client.db();

    const articleIdObject = new ObjectId(articleId);
    //Check existing
    const article = await db
      .collection("articles")
      .findOne({ _id: articleIdObject });

    if (article) {
      const filter = { _id: articleIdObject };

      // update the value of the 'LikeCount field'
      const updateArticle = {
        $set: {
          likeCount: article.likeCount + 1,
        },
      };
      const result = await db
        .collection("articles")
        .updateOne(filter, updateArticle);

      console.log(result);
      if (result.matchedCount === 0 || result.modifiedCount === 0) {
        console.log("Error: No Article Match or no field match");
        res.status(500).json({ message: "No Article Match or no field match" });
      } else {
        //Send success response
        res.status(201).json({ message: "liked !", ...result });
      }

      //Close DB connection
      client.close();
    } else {
      //Response for other than POST method
      res.status(500).json({ message: "no article found" });
    }
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default likeHandler;
