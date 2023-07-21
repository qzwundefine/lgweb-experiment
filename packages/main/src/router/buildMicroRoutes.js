import packageConfig from "@/../../config/config.json";
import BuildMicroPage from "../components/BuildMicroPage";

const config = JSON.parse(JSON.stringify(packageConfig));

function buildMicroRoutes() {
  const routes = [];
  Object.keys(config).forEach((key) => {
    if (key !== "main") {
      routes.push({
        path: `/${key}/:page*`,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        component: <BuildMicroPage name={key} />,
        meta: { auth: "test" },
      });
    }
  });
  return routes;
}

export default buildMicroRoutes;
