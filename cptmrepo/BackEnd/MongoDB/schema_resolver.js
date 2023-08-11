// product list based on selected 
// todo: pagination for results page
import { gql } from 'apollo-server-express';

export const typeDefs = gql` 
  type productCard {
    DESCRIPTION: String
    ID: Int
    PRICE: Float
    IMAGE_URL: String
  }

  type Product {
    DESCRIPTION: String
    ID: Int
    PRICE: Float
    GW: Float 
    NW: Float
    M3: Float
    PCS: Int
    IMAGE_URL: String
    LOCATION: String
    FRONT_BACK: String 
    REVIEWS: [ReviewObj]
  }

  type Category {
    category: String
    sub_categories: [String]
  }

  type ReviewObj {
    rating: Float
    review: String
  }

  input Car {
    year: Int!
    make: String! 
    model: String!
  }

  type Query {
    getAllYears: [Int] 
    getMakes(year: Int): [String]
    getModels(year: Int, make: String!): [String]
    getCategories(vehicle: Car): [Category]
    getProducts(vehicle: Car): [Product], 
    quickView(id: Int!): productCard
    fullProductView(id: Int!): Product 
    partFitment(vehicle: Car!, id: Int!): Boolean
  }
`;

const getAllYearsFunc = async (parent, args, {collection}) => {
    try {
        let uniqueYears = await collection.aggregate([
                            { $unwind: "$YEARS_ACCEPTED" },
                            { $group: { _id: null, uniqueYears: { $addToSet: "$YEARS_ACCEPTED" } }}
        ]).toArray();
        uniqueYears = uniqueYears[0].uniqueYears.sort((a, b) => a - b);
        return uniqueYears;
    }
    catch (error) {
        console.error('Error fetching:', error);
        return [];
    }
}
const getMakesFunc = async (parent, {year}, {collection}) => {
    try {
        let filter; 
        if (year == null)
            filter = {}; 
        else 
            filter = {YEARS_ACCEPTED: { $in: [year] }};
        const makes = await collection.distinct("MAKE", filter);
        return makes;
} catch (error) {
  console.error('Error fetching data:', error);
  return [];
}
}
const getModelsFunc = async (parent, {year, make}, {collection})  => {
    try {
        let models; 
        if (year == null)
          models = await collection.distinct("MODEL", {MAKE: make});
        else 
          models = await collection.distinct("MODEL", {MAKE: make, YEARS_ACCEPTED: year});
        return models;
} catch (error) {
  console.error('Error fetching data:', error);
  return [];
}
}
const getCategoriesFunc = async (parent, {vehicle}, {collection})  => {
    try {
        let category_objs = [];
        let categories; 

        if (vehicle == null) {
            categories = await collection.distinct("CATEGORY");
            for (let category of categories) {
              const subcategories = await collection.distinct("SUB_CATEGORY", {
                                                              CATEGORY: category,});
              category_objs.push({category: category, sub_categories: subcategories});
          }
          return category_objs;
        }
        const {year, make, model} = vehicle; 
        const filter = {YEARS_ACCEPTED: year, MAKE: make, MODEL: model}; 
        let sub_filter;  
        categories = await collection.distinct("CATEGORY", filter);
    
        for (let category of categories) {
            sub_filter = {YEARS_ACCEPTED: year, MAKE: make, MODEL: model, CATEGORY: category}; 
            const subcategories = await collection.distinct("SUB_CATEGORY", sub_filter);
            category_objs.push({category: category, sub_categories: subcategories});
        }
        return category_objs;
    } catch (error) {
        console.error('Error fetching makes:', error);
        return [];
    }
}
const getProductsFunc = async (parent, {vehicle}, {collection})  => {
  try {
      let products; 
      let projection = {DESCRIPTION: 1, ID: 1, PRICE: 1, IMAGE_URL: 1, GW: 1, NW: 1, M3: 1, PC3: 1, LOCATION: 1, FRONT_BACK: 1}; 
      if (vehicle != null) {
          let {year, make, model} = vehicle; 
          let filter = {YEARS_ACCEPTED: year, MAKE: make, MODEL: model}; 
          products = await collection.find(filter, projection).limit(30);
          // limit(pageSize).toArray()
      }
      else 
        products = await collection.find({}, projection).limit(30);
      const productsArray = await products.toArray();
      console.log(productsArray);
      return productsArray;
  } catch (error) {
      console.error('Error fetching makes:', error);
      return [];
  }
}
const getProductFunc = (fullProduct) => async (parent, {id}, {collection})  => {
    try {
        let projection = {}; 
        if (fullProduct) {
            projection = {DESCRIPTION: 1, ID: 1, PRICE: 1, IMAGE_URL: 1, 
                                                     GW: 1, NW: 1, M3: 1, PC3: 1, LOCATION: 1, FRONT_BACK: 1}; 
        }
        else {
            projection = {DESCRIPTION: 1, ID: 1, PRICE: 1, IMAGE_URL: 1}; 
        }
        const product = await collection.findOne({ID: id}, projection);
        return product;
} catch (error) {
  console.error('Error fetching:', error);
  return {};
}
}
const partFitmentFunc = async (parent, {vehicle, id}, {collection})  => {
    try {
        const {year, make, model} = vehicle; 
        const filter = {YEARS_ACCEPTED: year, MAKE: make, MODEL: model, ID: id}; 
        const parts = await collection.distinct("CATEGORY", filter);
        return !(parts.length === 0)
} catch (error) {
  console.error('Error fetching:', error);
  return false;
}
}
export const resolvers = {
    Query: {
      getAllYears: getAllYearsFunc,                 // populate Year dropdown in MyGarage 
      getMakes: getMakesFunc,                       // populate Shop by Vehicles; opt parameter (year) for MyGarage makes
      getModels: getModelsFunc,                     // populte MyGarage, params: year, make
      getCategories: getCategoriesFunc,             // once MyGarage vehicle is selected, filter categories by vehicle (obj: year make model)
      getProducts: getProductsFunc, 
      quickView: getProductFunc(false),             // populate product card in all products page
      fullProductView: getProductFunc(true),        // when you click open a specific product link
      partFitment: partFitmentFunc,               
    },
  };

  