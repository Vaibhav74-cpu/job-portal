import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import { RouterProvider } from "react-router";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/auth/Home";
import Jobs from "./components/Jobs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/jobs",
    element: <Jobs/>
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
