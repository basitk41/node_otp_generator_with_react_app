import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "../hoc/layout";
import { paths } from "./components";
const Routing = () => {
  return (
    <Router>
      <Routes>
        {paths.map((item) => (
          <Route path={item.path} element={<Layout>{item.Component}</Layout>} />
        ))}
        <Route
          path={"*"}
          element={<h1 align="center">404, page not found!</h1>}
        />
      </Routes>
    </Router>
  );
};
export default Routing;
