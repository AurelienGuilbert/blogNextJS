import mongoConnect from "../../../config/mongoConnect";
import { ObjectId } from "mongodb";

async function CommentHandler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log("comment server side");

    //Getting data from body req
    const { articleId, comment } = req.body;
    console.log(articleId, comment);

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
      .count()
    
    // update the value of the 'CommentCount field'


    const filter = { _id: articleIdObject };
    
    const updateArticle = {
      $set: {
          commentCount: commentCount,
      },
    };
    const result = await db.collection('articles').updateOne(filter, updateArticle);

    
    console.log('commentCount---------------');
    console.log(commentCount);

    res.status(201).json({ message: "comment posted !", ...result });

    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default CommentHandler;
