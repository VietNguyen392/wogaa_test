import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import PollDetail from "./pages/poll_detail/[slug]";
import CreatePoll from "./pages/create_poll";
import Header from "./components/layout/header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const webRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:slug", element: <PollDetail /> },
  { path: "/create", element: <CreatePoll /> },
]);
function App() {
  return (
    <div className="container mx-auto">
      {localStorage.getItem("auth") ? (
        <>
          <Header />
          <RouterProvider router={webRouter} />
          <ToastContainer
            position={"top-right"}
            autoClose={1000}
            theme={"light"}
          />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
