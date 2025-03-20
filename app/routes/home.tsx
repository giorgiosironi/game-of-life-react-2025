import type { Route } from "./+types/home";

export function loader() {
  return { name: "World" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Hello, {loaderData.name}</h1>
    </div>
  );
}
