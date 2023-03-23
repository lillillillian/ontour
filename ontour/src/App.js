import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Results from "./pages/Results";
import Venue from "./pages/Venue";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Styles/FontTheme";
import Error from "./pages/Error";

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />}>
//       <Route path="dashboard" element={<Dashboard />} />
//       {/* ... etc. */}
//     </Route>
//   )
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/artist?",
//         element: <Artist />,
//       },
//     ],
//   },
//   // {
//   //   path: "/artist?:params",
//   //   element: <Artist />,
//   //   errorElement: <Artist />,
//   // },
//   // {
//   //   path: "/results",
//   //   element: <Results />,
//   //   errorElement: <Error />,
//   // },
//   // {
//   //   path: "/venue",
//   //   element: <Venue />,
//   //   errorElement: <Error />,
//   // },
// ]);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/results" element={<Results />} />
            <Route path="/venue" element={<Venue />} />
          </Routes>
        </Router>
        {/* <RouterProvider router={router} /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
