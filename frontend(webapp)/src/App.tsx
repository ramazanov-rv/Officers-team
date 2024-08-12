import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components";
import { Donations } from "./pages";
import { SingleDonationPage } from "./pages/donations/[id]";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Donations />,
        },
        { path: "donations/:id", element: <SingleDonationPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
