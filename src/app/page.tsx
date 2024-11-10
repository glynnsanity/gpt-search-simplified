// app/page.tsx
import { Metadata } from "next";
import Home from "./components/Home/Home";

export const metadata: Metadata = {
  title: "ChatGPT Search",
  description: "Proof of concept for integrating ChatGPT and LaunchDarkly",
};

const Page = () => {
  return <Home />;
};

export default Page;
