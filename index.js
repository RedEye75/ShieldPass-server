const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json()); // mongoDB
// const uri = `mongodb+srv://shieldpass:NylvrTFqQdKhPxfc@cluster0.petbnp7.mongodb.net/?retryWrites=true&w=majority`;
// // console.log(uri);

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.petbnp7.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const passCollection = client.db("shieldpass").collection("usersPasswords");
    const categoryCollection = client.db("shieldpass").collection("category");

    app.get("/passCategory", async (req, res) => {
      const query = {};
      const result = await categoryCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });

    app.post("/passwords", async (req, res) => {
      const pass = req.body;
      const result = await passCollection.insertOne(pass);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));
app.get("/", async (req, res) => {
  res.send("server running");
});
app.listen(port, () => console.log(`server running on port ${port}`));
