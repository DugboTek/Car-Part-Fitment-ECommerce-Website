import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./Pages/HomePage";
import { FaShoppingCart } from "react-icons/fa";
import ContactUs from "./Components/HomePage/ContactUs";
import ResultsPage from "./Components/ResultsPage/ResultsPage";
import ProductSpecsPage from "./Pages/ProductSpecsPage";
import { Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apollo_client } from "../src/Components/util/apolloClient.js";
import createHistory from "history/createBrowserHistory";
import Te from "./Components/Garage/TestingGarCat";
// import ThreedTest from "./Components/ThreedTest";

const history = createHistory();
// const sampleProds = [
//   {
//     name: "ItemX",
//     price: 19.99,
//     count: 0,
//     counterVal: 1,
//     inCart: false
//   },
//   {
//     name: "ItemY",
//     price: 14.99,
//     count: 0,
//     counterVal: 1,
//     inCart: false
//   }
// ];

function App() {
  return (



    <Router history={history}>
      <ChakraProvider>
        <ApolloProvider client={apollo_client}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Search/:query" component={ResultsPage} />
            <Route exact path="/product/:query" component={ProductSpecsPage} />
            <Route exact path="/contact" component={ContactUs} />
          </Switch>
        </ApolloProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
