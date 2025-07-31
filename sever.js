const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri ="mongodb+srv://juniahsolo01:<WLrPPsYL7rwCLV1U@cluster0.5o99ryu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API versio
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
