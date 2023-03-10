import mongoConnect from "../../../config/mongoConnect";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log("post server side");
    //Getting email and password from body
    const { author, title, content, tag } = req.body;

    // connexion to database
    const client = await mongoConnect();
    const db = client.db();

    //Check existing
    const checkExisting = await db
      .collection("users")
      .findOne({ email: author });

    //pass author objectid
    if (checkExisting) {
      //Create
      const authorId = checkExisting._id;
      const authorName = checkExisting.name;

      const status = await db.collection("articles").insertOne({
        authorId,
        authorName,
        title,
        content,
        tag,
      });
      //Send success response
      res.status(201).json({ message: "post created", ...status });
      //Close DB connection
      client.close();
    } else {
      //Response for other than POST method
      res.status(500).json({ message: "no user found" });
    }
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
