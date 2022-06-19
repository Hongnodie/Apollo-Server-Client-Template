// FRONTEND PAGE BLOCK DESIGN (TO INTERACT WITH CLOUD DATA)
// ALL DEPENDENCIES INCLUDE "react react-dom react-router-dom @apollo/client"
// STAY IN THE START BY RUNNING COMMAND "npx create-react-app <react project folder name (i.e reactscript)>" as https://create-react-app.dev/docs/getting-started#quick-start
// COULD REMOVE SOME DEPENDENCIES BY COMMAND "npm uninstall web-vitals @testing-library/user-event @testing-library/react @testing-library/jest-dom"
// ALTERNATIVELY SCHEME THE FOLDER WITH PROVIDED TEMPLATES BY RUNNING COMMAND "npx create-react-app <project name> --template cra-template" https://create-react-app.dev/docs/custom-templates/

// 1-IMPORT FRAMEWORK(FUNCTIONS AND MODELS) OF REACT
// RUN COMMAND "npm i react react-dom"
// Built based on examples (here adopt the "counter-app") from https://reactjs.org/community/examples.html
import React from "react";
import ReactDOM from "react-dom";

// import "./index.css";

// 2-DEFINE THE ROUTING (BLOCKS IN BLOCK)
// Guide here https://v5.reactrouter.com/web/guides/quick-start
// Easy understanding (roadmap) seen here https://www.apollographql.com/docs/react/caching/overview
// 2.1-Basic settings to tell apollo/client as required
// Examples at https://www.apollographql.com/docs/react/get-started#2-initialize-apolloclient
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
// 2.2-React Unit block
// Fetch value from cloud DB and return a block of components (Alternatively // import ChildrenSection from "./components/childrenSection";)
// 2.2.1-Write context to be sent to cloud
// Example at https://www.apollographql.com/docs/react/get-started#4-fetch-data-with-usequery
import { useQuery, gql } from '@apollo/client';
const UserInfoQuery = gql`
    query allUser {
        selfid
        username
    }`
// 2.2.2-Build this block
function UnitReactBlock() {
    const { loading, error, data } = useQuery(UserInfoQuery);
    // console.log(data);
    // if (loading) return {<p>Loading...</p>);
    // if (error) return <p>Error</p>;
    
    return <div>work</div>
    // return data.allUser.map(({ selfid, username }) => {
    //     return (
    //         <div>
    //             <p>Tier3 (UnitReactBlock) Wrapper for children</p>
    //             <span>
    //                 UnitReactBlock gives selfid: {selfid}
    //             </span>
    //         </div>
    //     )});
}
function OtherRouteBlock() {
    // const { loading, error, data } = useQuery(UserInfoQuery);
  
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error</p>;
    // console.log(data);

    // return data.allUser.map(({ selfid, username }) => (
    //     <div>
    //         <p>Tier3 (OtherRouteBlock) Wrapper for children</p>
    //         <span>
    //             OtherRouteBlock gives username: {username}
    //         </span>
    //     </div>
    // ));
}
// 2.3-Path definition - when blocks relates to routing (Alternatively // import App from "./App";)
// RUN COMMAND "npm i react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

// 3-START REACT - A ASYNC WATERFLOW TO PARSE SOME VARIABLES AS PROPERTIES
// strict-mode provides additional debugger, detail here https://reactjs.org/docs/strict-mode.html
ReactDOM
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('locator')
    );
  