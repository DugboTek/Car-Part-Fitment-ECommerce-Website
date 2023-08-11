import AWS from "aws-sdk";
import { MongoClient, ServerApiVersion } from "mongodb";

/**** AWS connection ****/
const credentials = new AWS.SharedIniFileCredentials({
  profile: "cloud-search",
  filename: "./../../AWSconfig.json",
});

AWS.config.credentials = credentials;
AWS.config.update({ region: "us-east-1" });

// Create an instance of AWS CloudSearchDomain
const cloudSearch = new AWS.CloudSearchDomain({
  endpoint:
    "search-parts-search-final-23qdv6tzpidmobz3ednv6wxonm.us-east-1.cloudsearch.amazonaws.com",
  region: "us-east-1",
});

/**** MongoDB connection ****/
const mongoURI = `mongodb+srv://CPTM:F3XdtehzsKt5cuMa@cluster0.ycxjdeu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});
await client.connect();
const collection = client.db("Parts").collection("Data");

/**** interfaces ****/
interface ResolverArgs {
  query: string;
  // brandFacet: boolean;
  //modelFacet: boolean;
  yearFacet: boolean;
  makeFacet: boolean;
  modelFacet: boolean;
  categoryFacet: boolean;
  subcategoryFacet: boolean;
  locationFacet: boolean;
  facetSelection: FacetSelectionInput;
  page: number;
}

interface IDArgs {
  query: string;
}

interface Suggestions {
  category_text: SuggestItem[];
  description: SuggestItem[];
  make_text: SuggestItem[];
  model_text: SuggestItem[];
  sub_category_text: SuggestItem[];
}

interface SearchResult {
  parts: Object[];
  facets: Facets;
}

interface IDResult {
  parts: Object[];
}
interface SuggestItem {
  suggestion: string;
  score: number;
  id: string;
}

interface SuggestData {
  query: string;
  found: number;
  suggestions: SuggestItem[];
}

interface SuggestStatus {
  rid: string;
  "time-ms": number;
}

interface SuggestResult {
  status: SuggestStatus;
  suggest: SuggestData;
}

interface fullSuggestions {
  suggestions: SuggestResult[];
}

interface Facets {
  years_accepted: Facet[];
  category: Facet[];
  sub_category: Facet[];
  make: Facet[];
  model: Facet[];
  location: Facet[];
  price: Facet[];
}
interface Facet {
  value: string;
  count: number;
}

interface FacetSelection {
  years_accepted: number;
  make: string;
  model: string;
  // brand: string;
}

interface FacetSelectionInput {
  years_accepted: number;
  make: string;
  model: string;
  category: string;
  sub_category: string;
  location: string;
}

/**** CloudSearch resolver functions ****/
const searchPartsResolver = async (
  parent: any,
  { query }: { query: string }
): Promise<Object[]> => {
  try {
    const params = {
      query: query,
      queryParser: "simple",
      return: "_all_fields",
    };
    const searchResult = await cloudSearch.search(params).promise();
    // console.log(searchResult.hits);

    const parts = searchResult.hits?.hit?.map((hit) => {
      const fields = hit.fields;
      return {
        no: fields?.no?.[0],
        code: fields?.code?.[0],
        description: fields?.description?.[0],
        make: fields?.make?.[0],
        model: fields?.model?.[0],
        oem: fields?.oem?.[0],
        pcs: fields?.pcs?.[0],
        nw: fields?.nw?.[0],
        gw: fields?.gw?.[0],
        m3: fields?.m3?.[0],
        startYear: fields?.start_year?.[0],
        endYear: fields?.end_year?.[0],
        image_names: fields?.image_names?.[0],
      };
    });

    return parts ?? [];
  } catch (error) {
    console.error("Error occurred during parts search:", error);
    throw new Error("An error occurred during parts search.");
  }
};

const getProductByID = async (
  _parent: any,
  { query }: IDArgs
): Promise<IDResult> => {
  // Change the return type to IDResult
  try {
    // Perform the search using the CloudSearch API with the _id field
    const documentID = query;
    const filterQuery = `(term field = _id '${documentID}')`;

    const params = {
      queryParser: "structured",
      query: "matchall", // Use the 'matchall' operator to match all documents
      filterQuery: filterQuery,
      return: "_all_fields",
    };
    const searchResult = await performPartsSearch(query, params);

    // Check if there is a matching part and return its unique_id
    if (searchResult && searchResult.hits?.hit?.length > 0) {
      const parts = searchResult.hits.hit.map((hit: any) => {
        const fields = hit.fields;
        return {
          num_hits: searchResult.hits.found,
          doc_id: hit.id,
          unique_id: fields?.unique_id?.[0],
          description: fields?.description?.[0],
          make: fields?.make_text?.[0],
          model: fields?.model_text?.[0],
          image_names: fields?.image_names?.[0],
          category: fields?.category_literal?.[0],
          sub_category: fields?.sub_category_literal?.[0],
          price: fields?.price?.[0],
          image_url: fields?.image_url?.[0], // Get the image_url field from the CloudSearch response
          years_accepted: fields?.years_accepted?.map((year: string) =>
            parseInt(year, 10)
          ),
        };
      });

      return { parts: parts };
    }

    // Return an empty array if no matching part is found
    return { parts: [] };
  } catch (error) {
    console.error("Error occurred during getProductByID:", error);
    throw new Error("An error occurred during getProductByID.");
  }
};

/**
 * GraphQL resolver function to search for partial parts with facet filtering.
 * @param {any} parent - The parent of the GraphQL resolver.
 * @param {ResolverArgs} args - The arguments passed to the resolver.
 * @param {any} context - The context object for the resolver.
 * @param {any} info - The GraphQL resolve info.
 * @returns {Promise<SearchResult>} A promise that resolves to the search result.
 */
const searchPartialPartsResolver = async (
  parent: any,
  args: ResolverArgs,
  context: any,
  info: any
): Promise<SearchResult> => {
  const {
    query,
    facetSelection,
    yearFacet,
    makeFacet,
    modelFacet,
    categoryFacet,
    subcategoryFacet,
    locationFacet,
    page,
  } = args;

  const itemsPerPage = 20; // Define the number of items per page
  const numberOfResults = itemsPerPage * page; // Calculate the number of results to fetch

  try {
    const filters: string | null = generateFilters(
      yearFacet,
      makeFacet,
      modelFacet,
      categoryFacet,
      subcategoryFacet,
      locationFacet,
      facetSelection
    );

    const params = {
      query: query,
      queryParser: "simple",
      size: numberOfResults.toString(),
      return: "_all_fields",
      start: 0,
      filterQuery: filters,
    };
    const searchResult = await performPartsSearch(query, params);

    const parts = extractParts(searchResult);

    const facetSearchResult = await performFacetSearch(query, filters);
    const yearFacets = facetSearchResult?.facets?.years_accepted?.buckets?.map(
      (bucket: any) => ({
        value: bucket.value,
        count: bucket.count,
      })
    );
    const categoryFacets =
      facetSearchResult?.facets?.category_literal?.buckets?.map(
        (bucket: any) => ({
          value: bucket.value,
          count: bucket.count,
        })
      );
    const sub_categoryFacets =
      facetSearchResult?.facets?.sub_category_literal?.buckets?.map(
        (bucket: any) => ({
          value: bucket.value,
          count: bucket.count,
        })
      );
    const makeFacets = facetSearchResult?.facets?.make_literal?.buckets?.map(
      (bucket: any) => ({
        value: bucket.value,
        count: bucket.count,
      })
    );
    const modelFacets = facetSearchResult?.facets?.model_literal?.buckets?.map(
      (bucket: any) => ({
        value: bucket.value,
        count: bucket.count,
      })
    );
    const priceFacets = facetSearchResult?.facets?.price?.buckets?.map(
      (bucket: any) => ({
        value: bucket.value,
        count: bucket.count,
      })
    );
    const locationFacets = facetSearchResult?.facets?.location?.buckets?.map(
      (bucket: any) => ({
        value: bucket.value,
        count: bucket.count,
      })
    );

    // console.log(categoryFacets)
    //FACETS
    //search facets: years_accepted, make, model
    //category, front_back, make, model, sub_category, start_year, end_year
    return {
      parts: parts ?? [],
      facets: {
        category: categoryFacets ?? [],
        years_accepted: yearFacets ?? [],
        sub_category: sub_categoryFacets ?? [],
        make: makeFacets ?? [],
        model: modelFacets ?? [],
        location: locationFacets ?? [],
        price: priceFacets ?? [],
      },
    };
  } catch (error) {
    console.error("Error occurred during parts search:", error);
    throw new Error("An error occurred during parts search.");
  }
};

/**
 * Function to generate filter queries for facets.
 * @param {boolean} yearFacet - Whether to apply the year facet.
 * @param {FacetSelectionInput} facetSelection - The selected facet values.
 * @returns {string[]} An array of filter queries for facets.
 */
const generateFilters = (
  yearFacet: boolean,
  makeFacet: boolean,
  modelFacet: boolean,
  categoryFacet: boolean,
  subcategoryFacet: boolean,
  locationFacet: boolean,
  facetSelection: FacetSelectionInput
): string | null => {
  const filters = [];

  if (yearFacet && facetSelection?.years_accepted) {
    filters.push(
      `(term field=years_accepted ${facetSelection.years_accepted})`
    );
  }

  if (makeFacet && facetSelection?.make) {
    filters.push(`(term field=make_literal '${facetSelection.make}')`);
  }

  if (modelFacet && facetSelection?.model) {
    filters.push(`(term field=model_literal '${facetSelection.model}')`);
  }

  if (categoryFacet && facetSelection?.category) {
    filters.push(`(term field=category_literal '${facetSelection.category}')`);
  }

  if (subcategoryFacet && facetSelection?.sub_category) {
    filters.push(
      `(term field=sub_category_literal '${facetSelection.sub_category}')`
    );
  }

  if (locationFacet && facetSelection?.location) {
    filters.push(`(term field=location '${facetSelection.location}')`);
  }

  return filters.length > 0 ? `(and ${filters.join(" ")})` : null;
};

/**
 * Function to perform search for parts with filters.
 * @param {string} query - The search query.
 * @param {any} params - parameters for search
 * @returns {Promise<any>} A promise that resolves to the search result.
 */
const performPartsSearch = async (query: string, params: any): Promise<any> => {
  const searchResult = await cloudSearch.search(params).promise();
  return searchResult;
};

/**
 * Function to extract part information from the search result.
 * @param {any} searchResult - The search result object.
 * @returns {Object[]} An array of parts extracted from the search result.
 */
const extractParts = (searchResult: any): Object[] => {
  const parts = searchResult.hits?.hit?.map((hit: any) => {
    const fields = hit.fields;
    return {
      num_hits: searchResult.hits.found,
      doc_id: hit.id,
      unique_id: fields?.unique_id?.[0],
      description: fields?.description?.[0],
      make: fields?.make_text?.[0],
      model: fields?.model_text?.[0],
      image_names: fields?.image_names?.[0],
      image_url: fields?.image_url?.[0],
      price: fields?.price?.[0],
      m3: fields?.m3?.[0],
      gw: fields?.gw?.[0],
      nw: fields?.nw?.[0],
      sub_category: fields?.sub_category_literal?.[0],
      category: fields?.category_literal?.[0],
      oem: fields?.oem?.[0],
      years_accepted: fields?.years_accepted?.map((year: string) =>
        parseInt(year, 10)
      ),
    };
  });

  return parts ?? [];
};
/**
 * Function to perform facet search with filters.
 * @param {string} query - The search query.
 * @param {string[]} filters - An array of filter queries for facets.
 * @returns {Promise<any>} A promise that resolves to the facet search result.
 */
const performFacetSearch = async (
  query: string,
  filters: string | null //change to string maybe
): Promise<any> => {
  const facetOptions = {
    years_accepted: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
    category_literal: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
    sub_category_literal: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
    make_literal: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
    model_literal: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
    location: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
    price: {
      sort: "count", // Sort the facets by count (descending order)
      size: 10, // Limit the result to the top 10 facet values
    },
  };

  const facetParams = {
    query: query,
    queryParser: "simple",
    facet: JSON.stringify(facetOptions),
    filterQuery: filters!, // Apply the same filters to the facet search
  };

  const facetSearchResult = await cloudSearch.search(facetParams).promise();
  return facetSearchResult;
};

const searchSuggestions = async (
  _parent: any,
  { searchTerm }: { searchTerm: string }
): Promise<Suggestions> => {
  try {
    const suggesters = [
      "category_text",
      "description",
      "make_text",
      "model_text",
      "sub_category_text",
    ];
    const suggestionResults: { [key: string]: SuggestItem[] } = {};

    // Query each suggester separately and store results in suggestionResults object
    for (const suggester of suggesters) {
      // Use AWS CloudSearch to get suggestions
      const cloudSearchResponse = await callCloudSearchSuggester(
        suggester,
        searchTerm
      );

      // Store the suggestions from the response
      suggestionResults[suggester] = cloudSearchResponse;
    }
    // console.log("suggestionResults");
    // console.log(suggestionResults.description);
    // Convert the suggestionResults object to the desired format
    const formattedResponse: Suggestions = {
      category_text: suggestionResults.category_text,
      description: suggestionResults.description,
      make_text: suggestionResults.make_text,
      model_text: suggestionResults.model_text,
      sub_category_text: suggestionResults.sub_category_text,
    };
    // console.log("formatted response");
    // console.log(formattedResponse);
    return formattedResponse;
  } catch (error) {
    // Handle any errors that might occur during the process
    throw new Error("Failed to fetch suggestions.");
  }
};

const convertToSuggestResult = (
  suggestResults: SuggestItem[]
): SuggestResult => {
  // Return the converted SuggestResult object
  return {
    status: {
      rid: "", // You can assign the appropriate value here
      "time-ms": 0, // You can assign the appropriate value here
    },
    suggest: {
      query: "", // You can assign the appropriate value here
      found: suggestResults.length,
      suggestions: suggestResults,
    },
  };
};

const callCloudSearchSuggester = async (
  suggesterName: string,
  query: string
): Promise<SuggestItem[]> => {
  const suggestParams: AWS.CloudSearchDomain.SuggestRequest = {
    suggester: suggesterName,
    query,
    size: 100,
  };

  const suggesterInitialResults = (await cloudSearch
    .suggest(suggestParams)
    .promise()) as AWS.CloudSearchDomain.SuggestResponse;

  const suggesterResults = suggesterInitialResults?.suggest?.suggestions || [];

  // Filter out suggestions with undefined 'suggestion' values
  const validSuggestions = suggesterResults.filter(
    (result) => result.suggestion !== undefined
  );

  // Map the valid suggestions to the desired SuggestItem format
  const formattedSuggestions: SuggestItem[] = validSuggestions.map(
    (result) => ({
      suggestion: result.suggestion as string, // We can safely cast it to string
      score: result.score || 0,
      id: result.id || "",
    })
  );

  return formattedSuggestions;
};

const typeDefs = `#graphql
  type Query {
    getProductByID(query: String!): IDResult
    searchParts(query: String!): [CarPart]
    searchSuggestions(searchTerm:String!): Suggestions
    searchPartialParts(query: String!, yearFacet: Boolean, makeFacet: Boolean,modelFacet:Boolean,categoryFacet: Boolean,subcategoryFacet:Boolean,locationFacet:Boolean, facetSelection: FacetSelectionInput,page:Int): SearchResult
    getAllYears: [Int]
    getmakes(year: Int): [String]
    getmodels(year: Int, make: String!): [String]
    getCategories(vehicle: Car): [category]
    getProducts(vehicle: Car): [Product], 
    quickView(unique_id: Int!): productCard
    fullProductView(unique_id: Int!): Product 
    getMakeModels: [makeModels]
    partFitment(vehicle: Car!, unique_id: Int!): Boolean 
  }

   type IDResult {
    parts: [Part]
  }


  type Suggestions {
  category_text: [SuggestResult]
  description:[SuggestResult]
  make_text:[SuggestResult]
  model_text: [SuggestResult]
  sub_category_text: [SuggestResult]
}

  type CarPart {
    no: String!
    code: String
    description: String
    make: String
    model: String
    oem: String
    pcs: String
    nw: String
    gw: String
    m3: String
    years_accepted: [Int]
    image_names: String
  }

  type SuggestResult{
    suggestion: String
    score: Int
    id: String
  }

  type SearchResult {
    parts: [Part]
    facets: Facets
  }

  type Part {
    num_hits: Int,
    doc_id: String,
    unique_id: Int
    description: String
    make: String
    model: String
    years_accepted: [Int]
    image_names: String
    price: Float
    m3: Float
    gw: Float
    nw: Float
    oem: String
    image_url:String
    category: String
    sub_category: String
    location: String
  }

  type Facets {
    years_accepted:[Facet]
    category:[Facet]
    sub_category:[Facet]
    make:[Facet]
    model:[Facet]
    location:[Facet]
    price:[Facet]
  }


  type Facet {
    value: String
    count: Int
  }

   input FacetSelectionInput {
    years_accepted: Int
    make: String
    model:String
    category: String
    sub_category: String
    location: String
    #brand: String
    #model: String
  }

  type productCard {
    description: String
    unique_id: Int
    price: Float
    image_url: String
  }

  type Product {
    years_accepted: [Int], 
    make: String, 
    model: String,
    description: String
    unique_id: Int
    price: Float
    gw: Float 
    nw: Float
    m3: Float
    pcs: Int, 
    category: String, 
    sub_category: String, 
    image_url: String
    location: String
    front_back: String 
    reviews: [ReviewObj]
  }

  type category {
    category: String
    sub_categories: [String]
  }

  type makeModels {
    make: String 
    models: [String]
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
`;

/**** MongoDB resolver functions ****/
interface Vehicle {
  year: number;
  make: string;
  model: string;
}
const getAllYearsFunc = async () => {
  try {
    let uniqueYears = await collection
      .aggregate([
        { $unwind: "$years_accepted" },
        {
          $group: {
            _id: null,
            years_accepted: { $addToSet: "$years_accepted" },
          },
        },
      ])
      .toArray();
    uniqueYears = uniqueYears[0].years_accepted.sort(
      (a: number, b: number) => a - b
    );
    return uniqueYears;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getmakesFunc = async (parent: any, { year }: { year: number }) => {
  try {
    let filter: any = null;
    if (year != null) {
      filter = { years_accepted: { $in: [year] } };
    }

    const makes = await collection.distinct("make", filter);
    return makes;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getmodelsFunc = async (
  parent: any,
  { year, make }: { year: number; make: string }
) => {
  try {
    let models: string[];
    if (year == null) {
      models = await collection.distinct("model", { make: make });
    } else {
      models = await collection.distinct("model", {
        make: make,
        years_accepted: year,
      });
    }
    return models;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getCategoriesFunc = async (
  parent: any,
  { vehicle }: { vehicle: { year: number; make: string; model: string } }
) => {
  try {
    const category_objs: { category: string; sub_categories: string[] }[] = [];
    let categories: string[];

    if (vehicle == null) {
      categories = await collection.distinct("category");
      for (const category of categories) {
        const subcategories = await collection.distinct("sub_category", {
          category: category,
        });
        category_objs.push({ category, sub_categories: subcategories });
      }
      return category_objs;
    }

    const { year, make, model } = vehicle;
    const filter = { years_accepted: year, make: make, model: model };
    let sub_filter: any;
    categories = await collection.distinct("category", filter);

    for (const category of categories) {
      sub_filter = {
        years_accepted: year,
        make: make,
        model: model,
        category: category,
      };
      const subcategories = await collection.distinct(
        "sub_category",
        sub_filter
      );
      category_objs.push({ category, sub_categories: subcategories });
    }
    return category_objs;
  } catch (error) {
    console.error("Error fetching makes:", error);
  }
};

const getMakeModelsFunc = async () => {
  try {
    const make_objs: { make: string; models: string[] }[] = [];
    let makes: string[];

    makes = await collection.distinct("make");
    for (const make of makes) {
      const models = await collection.distinct("model", {
        make: make,
      });
      make_objs.push({ make, models: models });
    }
    return make_objs;
  } catch (error) {
    console.error("Error fetching makes:", error);
  }
};

const getProductsFunc = async (
  parent: any,
  { vehicle }: { vehicle: Vehicle }
): Promise<any[]> => {
  try {
    let products;
    let projection: any = {
      years_accepted: 1, 
      make: 1, 
      model: 1,
      description: 1,
      unique_id: 1,
      price: 1,
      image_url: 1,
      gw: 1,
      nw: 1,
      m3: 1,
      pcs: 1,
      category: 1,
      sub_category: 1,
      location: 1,
      front_back: 1,
      reviews: 1,
    };

    if (vehicle) {
      const { year, make, model } = vehicle;
      const filter = { years_accepted: year, make: make, model: model };
      products = await collection.find(filter, projection).limit(30);
    } else {
      products = await collection.find({}, projection).limit(30);
    }

    const productsArray = await products.toArray();
    return productsArray;
  } catch (error) {
    console.error("Error fetching makes:", error);
    return [];
  }
};

const getProductFunc =
  (fullProduct: boolean) =>
  async (parent: any, { unique_id }: { unique_id: string }): Promise<any> => {
    try {
      let projection: any = {
        description: 1,
        unique_id: 1,
        price: 1,
        image_url: 1,
      };
      if (fullProduct) {
        projection = {
          years_accepted: 1, 
          make: 1, 
          model: 1,
          description: 1,
          unique_id: 1,
          price: 1,
          image_url: 1,
          gw: 1,
          nw: 1,
          m3: 1,
          pcs: 1,
          category: 1,
          sub_category: 1,
          location: 1,
          front_back: 1,
          reviews: 1,
        };
      }
      const product = await collection.findOne(
        { unique_id: unique_id },
        projection
      );
      return product;
    } catch (error) {
      console.error("Error fetching:", error);
      return {};
    }
  };

const partFitmentFunc = async (
  parent: any,
  { vehicle, unique_id }: { vehicle: Vehicle; unique_id: string }
): Promise<boolean> => {
  try {
    const { year, make, model } = vehicle;
    const filter = {
      years_accepted: year,
      make: make,
      model: model,
      unique_id: unique_id,
    };
    const parts = await collection.distinct("category", filter);
    return !(parts.length === 0);
  } catch (error) {
    console.error("Error fetching:", error);
    return false;
  }
};

const resolvers = {
  Query: {
    getProductByID: getProductByID,
    searchParts: searchPartsResolver,
    searchPartialParts: searchPartialPartsResolver,
    searchSuggestions: searchSuggestions,
    getAllYears: getAllYearsFunc, // populate Year dropdown in MyGarage
    getmakes: getmakesFunc, // populate Shop by Vehicles; opt parameter (year) for MyGarage makes
    getmodels: getmodelsFunc, // populte MyGarage, params: year, make
    getCategories: getCategoriesFunc, // once MyGarage vehicle is selected, filter categories by vehicle (obj: year make model)
    getProducts: getProductsFunc,
    quickView: getProductFunc(false), // populate product card in all products page
    fullProductView: getProductFunc(true), // when you click open a specific product link
    getMakeModels: getMakeModelsFunc,
    partFitment: partFitmentFunc,
  },
};

export { typeDefs, resolvers };
