import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/examples/blinker", "routes/world-window.tsx"),
] satisfies RouteConfig;
