// import BirthdayWishes from "./BirthdayWishes";
// //import WorkAnniversary from "./WorkAnniversary";

// function App() {
//   return (
//     <div>
//       {/* <WorkAnniversary /> */}
//       <BirthdayWishes />
//     </div>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Claims from "./Claims";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Claims />} />
//       </Routes>
//     </Router>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Claims from "./Claims";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Claims />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
