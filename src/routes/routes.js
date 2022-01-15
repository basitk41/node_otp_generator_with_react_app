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
      </Routes>
    </Router>
  );
};
export default Routing;
