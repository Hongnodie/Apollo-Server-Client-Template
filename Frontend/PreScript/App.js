// 2.1-BLOCKS IN BLOCK
// Guide here https://v5.reactrouter.com/web/guides/quick-start
// 2.1.1-Framework introduce
// RUN COMMAND "npm i react-router-dom"
// import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Check the utility and example of @apollo/client here https://www.apollographql.com/docs/react/get-started, easy understanding seen here https://www.apollographql.com/docs/react/caching/overview
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// 2.1.2-Children block with return value introduced
import UnitReactBlock from "./components/UnitReactBlock";
import OtherRouteBlock from "./components/OtherRouteBlock";

// 2.1.3-Path definition & Export
// Every <Uppercase? returns only one component, thus try to wrap with "<div></div>" if you want a multiple components of same level
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="waterflow1">
            <p>Tier1 (BrowserRouter) Wrapper of react waterflow</p>
            <Routes>
              <p>Tier2 (Routes) Wrapper of react</p>
                <Route 
                path="/" 
                element={<UnitReactBlock />} 
                />
                <Route 
                path="/other" 
                element={<OtherRouteBlock />} 
                />
            </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}
  
export default App;