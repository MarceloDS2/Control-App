import React, { Suspense } from "react";
import "./main.scss";
import { fetchData } from "./Api";
const resource = fetchData();
const App2 = () => {
  <div className="App">
    <Suspense fallback={<h1>Loading Data...</h1>}>
      <DtatDetails />
    </Suspense>
  </div>;
};

const DtatDetails = () => {
  const hs = resource.data.read();
  return (
    <div>
      <ul>
        <li>{hs.humidity}</li>
      </ul>
    </div>
  );
};

export default App2;
