import {
  type RouteConfig,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";
import { paths } from "./routes/config";

export default [
  index("./routes/marketing/home.tsx"),
  layout(
    "./routes/dashboard/layout.tsx",
    prefix(paths.dashboard.root, [index("./routes/dashboard/index.tsx")])
  ),
] satisfies RouteConfig;
