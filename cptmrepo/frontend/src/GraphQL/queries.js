import { gql } from "@apollo/client";

export const SEARCH_SUGGESTIONS = gql`
  query Query($searchTerm: String!) {
    searchSuggestions(searchTerm: $searchTerm) {
      category_text {
        suggestion
        score
        id
      }
      description {
        suggestion
        score
        id
      }
      make_text {
        suggestion
        score
        id
      }
      model_text {
        suggestion
        score
        id
      }
      sub_category_text {
        suggestion
        score
        id
      }
    }
  }
`;
export const GET_PRODUCTS_BY_ID = gql`
  query Query($uniqueId: Int!) {
    fullProductView(unique_id: $uniqueId) {
      description
      unique_id
      price
      gw
      nw
      m3
      pcs
      image_url
      category
      sub_category
      location
      front_back
      model
      make
      years_accepted
      reviews {
        rating
        review
      }
    }
  }
`;

export const GET_PROD_BY_ID = gql`
  query Query($query: String!) {
    getProductByID(query: $query) {
      parts {
        num_hits
        doc_id
        unique_id
        description
        make
        model
        years_accepted
        image_names
        price
        m3
        gw
        nw
        image_url
        sub_category
        location
        category
      }
    }
  }
`;
export const SEARCH_RESULTS = gql`
  query Query(
    $query: String!
    $yearFacet: Boolean
    $makeFacet: Boolean
    $modelFacet: Boolean
    $categoryFacet: Boolean
    $subcategoryFacet: Boolean
    $locationFacet: Boolean
    $page: Int
    $facetSelection: FacetSelectionInput
  ) {
    searchPartialParts(
      query: $query
      yearFacet: $yearFacet
      makeFacet: $makeFacet
      modelFacet: $modelFacet
      categoryFacet: $categoryFacet
      subcategoryFacet: $subcategoryFacet
      locationFacet: $locationFacet
      page: $page
      facetSelection: $facetSelection
    ) {
      parts {
        num_hits
        doc_id
        unique_id
        description
        make
        model
        years_accepted
        image_names
        price
        m3
        sub_category
        location
        category
        nw
        gw
        oem
        image_url
      }
      facets {
        price {
          value
          count
        }
        years_accepted {
          value
          count
        }
        category {
          value
          count
        }
        sub_category {
          value
          count
        }
        make {
          value
          count
        }
        model {
          value
          count
        }
        location {
          value
          count
        }
      }
    }
  }
`;
/**** MongoDB queries ****/
export const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      description
      unique_id
      price
      gw
      nw
      m3
      pcs
      image_url
      location
      front_back
      reviews {
        rating
        review
      }
    }
  }
`;

export const ALL_CATEGORIES = gql`
  query Query {
    getCategories {
      category
      sub_categories
    }
  }
`;

export const ALL_YEARS = gql`
  query Query {
    getAllYears
  }
`;

export const SELECTED_MAKES = gql`
  query Query($year: Int) {
    getmakes(year: $year)
  }
`;

export const SELECTED_MODELS = gql`
  query Query($year: Int, $make: String!) {
    getmodels(year: $year, make: $make)
  }
`;

export const SELECTED_CATEGORIES = gql`
  query Query($vehicle: Car) {
    getCategories(vehicle: $vehicle) {
      category
      sub_categories
    }
  }
`;

export const MAKE_MODELS = gql`
  query Query {
    getMakeModels {
      make
      models
    }
  }
`;
