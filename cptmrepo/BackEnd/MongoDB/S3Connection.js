import AWS from "aws-sdk";
import dotenv, { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://EricDetjen:x2X4UIAJxwSYGuvt@cluster0.ycxjdeu.mongodb.net/?retryWrites=true&w=majority";


// AWS.config.update({ region: 'us-east-1' });

//AWS.config.credentials = new AWS.Credentials({

// AWS S3 configuration
dotenv.config();

const bucketName = 'cptm-images'; // your bucket name
const s3 = new AWS.S3();



// ... rest of your code ...

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Select your database and collection
    const db = client.db("Parts");
    const collection = db.collection("Data");
    // connect to MongoDB
    await client.connect();

    // Get the cursor for iterating over documents
    const cursor = collection.find();

    // Iterate over each document
    while (await cursor.hasNext()) {
      const doc = await cursor.next();

      // Check if the document has an IMAGE_NAMES field and it's not blank
      if (doc && doc.IMAGE_NAMES && doc.IMAGE_NAMES.trim() !== "") {
        const imageKey = `Images/${doc.IMAGE_NAMES}`; // update this if the path is different in your S3 bucket

        // Get the image URL
        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;

        // Test if the image exists on S3
        try {
          await s3.headObject({ Bucket: bucketName, Key: imageKey }).promise();

          // If no error is thrown, the image exists.
          // Update the document with the image URL
          await collection.updateOne(
            { _id: doc._id },
            { $set: { IMAGE_URL: imageUrl } }
          );
          console.log(`Updated document ${doc._id} with image URL ${imageUrl}`);
        } catch (err) {
          // If an error is thrown, the image doesn't exist.
          console.log(
            `Image ${doc.IMAGE_NAMES} not found on S3 for document ${doc._id}`
          );
        }
      } else {
        console.log(`Document ${doc._id} has no IMAGE_NAMES or it's blank`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
