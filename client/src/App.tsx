import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import RedirectPage from "./pages/RedirectPage";
import MainNavbar from "./layouts/MainNavbar";
import RedirectEditPage from "./pages/RedirectEditPage";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>
          <Route element={<MainNavbar />}>
            <Route index element={<Homepage />} />
            <Route path="links/" element={<Links />}>
              <Route path="edit/:id" element={<RedirectEditPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/go/:id" element={<RedirectPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={Router} />;
}

export default App;
