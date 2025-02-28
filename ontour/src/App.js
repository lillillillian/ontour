import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Venue from "./pages/Venue";
import { CssBaseline, ThemeProvider } from "@mui/material";
import OnTourTheme from "./Styles/OnTourTheme";
import SearchResults from "./pages/SearchResults";
import Festival from "./pages/Festival";
import AccountSettings from "./pages/AccountSettings";
import ProfilePage from "./pages/ProfilePage";
import FanAnalytics from "./pages/FanAnalytics";
import Tours from "./pages/Tours";
import ManageReviews from "./pages/ManageReviews";

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
    <ThemeProvider theme={OnTourTheme}>
      <div className="App">
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/fan-analytics" element={<FanAnalytics />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/manage-reviews" element={<ManageReviews/>} />
          </Routes>
        </Router>
        {/* <RouterProvider router={router} /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
