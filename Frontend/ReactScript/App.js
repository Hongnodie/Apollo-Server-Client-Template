// 2.1-BLOCKS IN BLOCK
// Guide here https://v5.reactrouter.com/web/guides/quick-start
// 2.1.1-Framework introduce
// import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2.1.2-Children block with return value introduce
import ChildrenSection from "./components/childrenSection";
import OtherChildrenSection from "./components/otherChildrenSection";

// 2.1.3-Path definition & Export
// Every <Uppercase? returns only one component, thus try to wrap with "<div></div>" if you want a multiple components of same level
function App() {
    return (
      <BrowserRouter>
        <div className="waterflow1">
            <p>Tier1 Wrapper of react waterflow</p>
            <Routes>
                <Route 
                path="/" 
                element={<ChildrenSection />} 
                />
                <Route 
                path="/other" 
                element={<OtherChildrenSection />} 
                />
            </Routes>
        </div>
      </BrowserRouter>
    );
  }
  
  export default App;