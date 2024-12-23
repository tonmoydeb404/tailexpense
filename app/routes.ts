import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { paths } from "./routes/config";

export default [
  index("./routes/marketing/home.tsx"),
  layout("./routes/dashboard/layout.tsx", [
    route(paths.dashboard.root, "./routes/dashboard/index.tsx"),
    route(paths.dashboard.transactions, "./routes/dashboard/transactions.tsx"),
    route(paths.dashboard.categories, "./routes/dashboard/categories.tsx"),
  ]),
] satisfies RouteConfig;
