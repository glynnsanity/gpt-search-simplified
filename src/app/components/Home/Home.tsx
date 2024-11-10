"use client";

import { ProductResult } from "../ProductAnswer/ProductResult";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Nav/Navbar";
import { SearchBar } from "../SearchBar/SearchBar";
import { ProductInfo } from "@/types/product";
import { KeyboardEvent, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";

export interface ProductResultsType {
  text: string;
  title: string;
  image: string | null;
  price: number;
  tags?: string[];
  productUrl?: string;
}

interface LDDecisionResultType {
  ldFlagDecision: {
    reason: {
      kind: string;
    }
    value: string;
    variationIndex: number;
  };
  gptActivationDecision: {
    flag_name: string;
    relevance: number;
    reasoning: string;
    context_alignment: string;
  };
}

interface SearchResultsType {
  productResults: ProductInfo[];
  decision: LDDecisionResultType;
}

// Define the default context object
const defaultContext = {
  key: `user-${Math.random().toString(36).substring(2, 15)}`,
  kind: "user",
  custom: { affinities: ['Quick Test'] },
};

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [decision, setDecision] = useState<LDDecisionResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [contextForDisplay, setContextForDisplay] = useState({});
  const matchCount = 5;

  // Retrieve or initialize the user context
  const getContext = () => {
    const storedContext = sessionStorage.getItem("userContext");
    return storedContext ? JSON.parse(storedContext) : defaultContext;
  };

  // Update the user context in sessionStorage
  const updateContext = (newAffinity: string) => {
    const currentContext = getContext();
    if (!currentContext.custom.affinities.includes(newAffinity)) {
      currentContext.custom.affinities.push(newAffinity);
      sessionStorage.setItem("userContext", JSON.stringify(currentContext));
    }
  };

  /* --- RESULTS HANDLER --- */
  const handleResults = async () => {
    if (!query.trim()) return; // Skip if query is empty

    setProducts([]);
    setDecision(null);
    setLoading(true);

    // The results from our search API route will contain our product information, and LaunchDarkly's activation result
    try {
      const results: SearchResultsType = await fetchData("/api/product-search", {
        query,
        matches: matchCount,
        clientContext: getContext(), // Pass the current context to the API
      });

      const context = getContext();
      setContextForDisplay(context);

      if (Array.isArray(results.productResults)) {
        setProducts(results.productResults);
      } else {
        console.error("Invalid response format");
        setProducts([]);
      }

      if (results.decision !== null) {
        setDecision(results.decision);

        // If the LD decision suggests adding a new affinity, update the context in sessionStorage
        // Hardcoding our Gen Z use case for now -- should be updated later alongside the updateContext function
        if (results.decision.gptActivationDecision.relevance > 0.7) {
          updateContext("Gen Z");
        }
      }
    } catch (error) {
      console.error("Error during answer generation:", error);
      setDecision(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* --- KEY DOWN HANDLER --- */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleResults();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center px-3 pt-4 sm:pt-8">
          <SearchBar
            inputRef={inputRef}
            query={query}
            onQueryChange={setQuery}
            onSearch={handleResults}
            onKeyDown={handleKeyDown}
          />

          {loading ? (
            <div className="animate-pulse mt-2 h-4 bg-gray-300 rounded w-full"></div>
          ) : products.length > 0 ? (
            <div className="mt-6 w-full grid grid-cols-3 gap-4">
              <div className="col-span-2 grid grid-cols-2 gap-4"> {/* Two-column grid layout */}
                {products.map((product, index) => (
                  <ProductResult
                    key={product.id || `product-${index}`}
                    descriptionHtml={product.description}
                    title={product.title}
                    image={product.featured_image_url ?? ""}
                    price={product.price}
                  />
                ))}
              </div>
              <div className="bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-lg font-semibold mb-2">Experiment Details</h2>
                <div className="mb-4">
                  <p className="font-medium">Flag Decision:</p>
                  <p className="text-green-600 font-bold">{decision && decision.ldFlagDecision.value ? "Active" : "Inactive"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Context:</p>
                  <p className="text-green-600 font-bold">{contextForDisplay ? JSON.stringify(contextForDisplay) : "No Context"}</p>
                </div>

                <h3 className="text-md font-semibold mb-2">GPT Activation Decision</h3>
                <div className="mb-2">
                  <p className="font-medium">Flag Name:</p>
                  <p>{decision ? decision.gptActivationDecision.flag_name : "None"}</p>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Relevance:</p>
                  <p>{decision ? decision.gptActivationDecision.relevance : "None"}</p>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Context Alignment:</p>
                  <p className="capitalize">{decision ? decision.gptActivationDecision.context_alignment : "None"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Reasoning:</p>
                  <p className="text-sm text-gray-700">{decision ? decision.gptActivationDecision.reasoning : "None"}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
