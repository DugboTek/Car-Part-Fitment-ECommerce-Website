import { MongoClient, ServerApiVersion } from "mongodb";
//import monoose and aws-sdk

import fs from 'fs';

//const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://EricDetjen:x2X4UIAJxwSYGuvt@cluster0.ycxjdeu.mongodb.net/?retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true
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

    const cursor = collection.find({});
    
      let images = [];

      while (await cursor.hasNext()) {
        const doc = await cursor.next();
        if (doc.image_url && doc.image_url !== "") {
          images.push({
            id: doc._id,
            url: doc.image_url,
          });
        }
      }
      console.log(images)



      //----------print html
        let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Image Gallery</title>
    </head>
    <body>
        ${images
          .map(
            (image) => `
            <div>
                <h3>ID: ${image.id}</h3>
                <img src="${image.url}" alt="Image" style="height:200px;">
            </div>
        `
          )
          .join("")}
    </body>
    </html>`;

        fs.writeFile('imageGallery.html', html, (err) => {
            if (err) throw err;
            console.log('HTML file has been saved.');
        });
    













//---------------------------------update image from aws to azure---------------------------------
// while(await cursor.hasNext()) {
//             const doc = await cursor.next();
//             console.log("Processing document with id: ", doc._id);

//             // If image_url exists and it's not an empty string
//             if (doc.image_url && doc.image_url !== "") {
//                 console.log("Found image_url: ", doc.image_url);
                
//                 const oldLink = doc.image_url;
//                 const imageName = oldLink.split("/").pop();
//                 const newBase = "https://cptm.blob.core.windows.net/cptm-images/";
//                 const newLink = newBase + imageName;

//                 console.log("Converted image_url: ", newLink);

//                 // Form the update
//                 const setUpdate = {
//                     "image_url": newLink
//                 };

//                 // Perform the update
//                 await collection.updateOne(
//                     { _id: doc._id },
//                     { $set: setUpdate }
//                 );
//                 console.log("Updated document with id: ", doc._id);
//             } else {
//                 console.log("No image_url or image_url is empty for document with id: ", doc._id);
//             }
//         }



//         return;

//-------------------------------update-ids--------------------------------------------
    // const cursor = collection.find();
    // while (await cursor.hasNext()) {
    //   const doc = await cursor.next();
    //   const setUpdate = {};
    //   const unsetUpdate = {};
    //   for (const field in doc) {
    //     if (field !== "_id") {
    //       let newField;
    //       if (field === "ID") {
    //         newField = "unique_id";
    //       } else {
    //         newField = field.toLowerCase();
    //       }
    //       if (field !== newField) {
    //         unsetUpdate[field] = "";
    //         setUpdate[newField] = doc[field];
    //       }
    //     }
    //   }
    //   if (
    //     Object.keys(setUpdate).length > 0 ||
    //     Object.keys(unsetUpdate).length > 0
    //   ) {
    //     await collection.updateOne(
    //       { _id: doc._id },
    //       { $set: setUpdate, $unset: unsetUpdate }
    //     );
    //   }
    // }
    //-------------------REPLACE BLANK SLOTS WITH QUOTES------------------
    // try {
    //   await collection
    //     .updateMany(
    //       { IMAGE_URL: { $exists: false } },
    //       { $set: { IMAGE_URL: "" } }
    //     );
    //   console.log("The operation was successful!");
    // } catch (err) {
    //   console.log("An error occurred: ", err);
    // }

    // const categories = await collection.distinct("CATEGORY");
    // console.log("Categories: ", categories);

    // //-------------------GET CATEGORYS AND SUB-CATEGORYS-------------------

    // // For each "CATEGORY", get unique "SUB_CATEGORY" values
    // for (let category of categories) {
    //   const SUB_CATEGORY = await collection.distinct("SUB_CATEGORY", {
    //     CATEGORY: category,
    //   });
    //   //.log("Category: " + category + ", Sub-Categories: ", SUB_CATEGORY);
    // }

    // // Get minimum "START_YEAR" value
    // const minStartYear = await collection
    //   .aggregate([
    //     { $group: { _id: null, minStartYear: { $min: "$START_YEAR" } } },
    //   ])
    //   .toArray();
    // console.log("Minimum Start Year: ", minStartYear[0].minStartYear);

    // const maxEndYear = await collection
    //   .aggregate([{ $group: { _id: null, maxEndYear: { $max: "$END_YEAR" } } }])
    //   .toArray();
    // console.log("Maximum End Year: ", maxEndYear[0].maxEndYear);




    //-------------------GET YEAR, MAKE, MODELS-------------------
    
    // const uniqueYears = await collection
    //   .aggregate([
    //     { $unwind: "$YEARS_ACCEPTED" },
    //     {
    //       $group: { _id: null, uniqueYears: { $addToSet: "$YEARS_ACCEPTED" } },
    //     },
    //   ])
    //   .toArray();
    
    // const sortedYears = uniqueYears[0].uniqueYears.sort((a, b) => a - b);
    //console.log("Unique Years: ", sortedYears);

    // For each "Year", get unique "SUB_CATEGORY" values
    // for (let year of sortedYears) {
    //   const makes = await collection.distinct("MAKE", {
    //     YEARS_ACCEPTED: { $in: [year] },
    //   });

    //   for (let make of makes) {
    //     const model = await collection.distinct("MODEL", {
    //       MAKE: make,
    //     });

    //     console.log("Year: " + year + ", make ", make + ", model: ", model);
    //   }
    // }

    // const yearMakeModel = await collection
    //   .aggregate([
    //     {
    //       $group: {
    //         _id: { year: "$YEARS_ACCEPTED", make: "$MAKE" },
    //         models: { $addToSet: "$MODEL" },
    //       },
    //     },
    //     {
    //       $sort: { "_id.year": 1, "_id.make": 1 },
                  

    //     },
    //   ])
    //   .toArray();
    

    // yearMakeModel.forEach((entry) => {
    //   console.log(
    //     "Year: " + entry._id.year + ", Make: " + entry._id.make + ", Models: ",
    //     entry.models
    //   );
    // });


    //   const models = await collection
    //     .aggregate([
    //       { $unwind: "$YEARS_ACCEPTED" },
    //       {
    //         $group: {
    //           _id: "$MODEL",
    //           uniqueBrands: { $addToSet: "$Brand" },
    //           uniqueYears: { $addToSet: "$YEARS_ACCEPTED" },
    //         },
    //       },
    //     ])
    //     .toArray();

    //   // for (let model of models) {
    //   //   console.log("MODEL: ", model._id);
    //   //   console.log("BRANDS: ", model.uniqueBrands);
    //   //   console.log("YEARS_ACCEPTED: ", model.uniqueYears);
    //   //   console.log("----------------------------");
    //   // }

    //   // const models = await collection
    //   //   .aggregate([
    //   //     { $unwind: "$YEARS_ACCEPTED" },
    //   //     {
    //   //       $group: {
    //   //         _id: "$MODEL",
    //   //         uniqueBrands: { $addToSet: "$Brand" },
    //   //         uniqueYears: { $addToSet: "$YEARS_ACCEPTED" },
    //   //       },
    //   //     },
    //   //   ])
    //   //   .toArray();

    //   // for (let model of models) {
    //   //   console.log("MODEL: ", model._id);
    //   //   console.log("BRANDS: ", model.uniqueBrands);
    //   //   console.log("YEARS_ACCEPTED: ", model.uniqueYears);
    //   //   console.log("----------------------------");
    //   // }

    //   const uniqueModels =  collection.distinct("MODEL")

    //   const categories = await collection.distinct("CATEGORY");
    //   //console.log("Categories: ", categories);

    //   // For each "CATEGORY", get unique "SUB_CATEGORY" values
    //   for (let category of categories) {
    //     const subCategories = await collection.distinct("SUB_CATAGORY", {
    //       CATEGORY: category,
    //     });
    //     // console.log(
    //     //   "Category: " + category + ", Sub-Categories: ",
    //     //   subCategories
    //     // );
    //   }

    // const modelz = await collection
    //   .aggregate([
    //     { $unwind: "$YEARS_ACCEPTED" },
    //     {
    //       $group: {
    //         _id: { Brand: "$Brand", MODEL: "$MODEL", YEAR: "$YEARS_ACCEPTED" },
    //         parts: { $addToSet: "$DESCRIPTION" },
    //       },
    //     },
    //   ])
    //   .toArray();

    // for (let model of modelz) {
    //   console.log("Brand: ", model._id.Brand);
    //   console.log("MODEL: ", model._id.MODEL);
    //   console.log("YEAR: ", model._id.YEAR);
    //   console.log("Parts: ", model.parts);
    //   console.log("----------------------------");
    //   //log the length of model.parts

    // }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}



run().catch(console.dir);


