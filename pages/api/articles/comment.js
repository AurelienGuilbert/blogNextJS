import mongoConnect from "../../../config/mongoConnect";
import { ObjectId } from "mongodb";

async function CommentHandler(req, res) {
  // use middleware here for token check
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.NEXTAUTH_SECRET;

  if (token !== secret) {
    res.status(403).json({ message: "Token invalid" });
  }

  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log("comment server side");

    //Getting data from body req
    const { articleId, comment } = req.body;

    // connexion to database
    const client = await mongoConnect();
    const db = client.db();

    const articleIdObject = new ObjectId(articleId);

    // put comment
    const status = await db.collection("comments").insertOne({
      articleId: articleIdObject,
      comment,
    });

    // count comment for this article
    const commentCount = await db
      .collection("comments")
      .find({ articleId: articleIdObject })
      .count();

    // update the value of the 'CommentCount field'

    const filter = { _id: articleIdObject };

    const updateArticle = {
      $set: {
        commentCount: commentCount,
      },
    };
    const result = await db
      .collection("articles")
      .updateOne(filter, updateArticle);

    res.status(201).json({ message: "comment posted !", ...result });

    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default CommentHandler;
