// app/page.tsx
import { Metadata } from "next";
import Home from "./components/Home/Home";

export const metadata: Metadata = {
  title: "MadeTrade Ethical Product Search",
  description: "Discover ethical, sustainable products with AI-powered search on MadeTrade.",
};

const Page = () => {
  return <Home />;
};

export default Page;
