import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";

const randomJob = [1, 2, 3,4,5,6,7,8];

function Browse() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl  pr-28 pl-28">
        <h1 className="font-bold text-xl my-4">
          Search Results ({randomJob.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 my-4">
          {randomJob.map((item, index) => {
            return (
              <div key={item}>
                <Job />
              </div>
            );
          })}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Browse;
