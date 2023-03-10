import mongoConnect from "../../../config/mongoConnect";
import { ObjectId } from "mongodb";

import { getSession } from "next-auth/react";

async function updateArticle(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(500).json({ message: "you must be logged in" });
  } else {
    //Only POST mothod is accepted
    if (req.method === "PUT") {
      console.log("post server side");

      //Getting body
      const { articleId, title, content } = req.body;

      // article id
      const articleIdObject = new ObjectId(articleId);

      // connexion to database
      const client = await mongoConnect();
      const db = client.db();

      // check if user is author of article
      const articleSearch = await db
        .collection("articles")
        .findOne({ _id: articleIdObject });

      if (!articleSearch) {
        res.status(500).json({ message: "article not found" });
      } else {
        const authorSearch = await db
          .collection("users")
          .findOne({ _id: articleSearch.authorId });

        if (authorSearch.email !== session?.user.email) {
          res
            .status(500)
            .json({
              message:
                "you are not the author of the article you cannot update it!",
            });
        } else {
          const filter = { _id: articleIdObject };

          const updateArticle = {
            $set: {
              title: title,
              content: content,
            },
          };
          const result = await db
            .collection("articles")
            .updateOne(filter, updateArticle);

          res.status(201).json({ message: "article updated !", ...result });
        }
      }
    } else {
      //Response for other than POST method
      res.status(500).json({ message: "Route not valid" });
    }
  }
}

export default updateArticle;
