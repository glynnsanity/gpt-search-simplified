// app/api/product-search/route.ts

import { supabaseAdmin } from '@/services/supabase/supabaseAdmin';
import { getFlagAndExperimentDecision } from '@/services/ai-search/optimizedSearchService';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface UserContext {
  key: string;
  kind: string;
  anonymous?: boolean;
  custom?: {
    affinities?: string[];
  };
}

export const config = {
  runtime: "edge",
};

// Handle POST request
export async function POST(req: Request): Promise<Response> {
  try {
    const { query, matches, clientContext } = (await req.json()) as {
      query: string;
      matches: number;
      clientContext: UserContext;
    };

    /* LaunchDarkly Feature Decision */
    const decision = await getFlagAndExperimentDecision(query, { 
      flag_name: 'Gen Z Optimized Search', 
      description: 'This experiment is intended to optimize search functionality specifically for Gen Z.'
    }, clientContext)

    /* GPT embedding search */
    const embeddingInput = query.replace(/\n/g, " ");
    const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-embedding-3-small", 
        input: embeddingInput,
      }),
    });

    if (!embeddingResponse.ok) {
      const errorMessage = await embeddingResponse.text();
      console.error("OpenAI API error:", errorMessage);
      return new Response("Error generating embeddings", { status: 500 });
    }

    const json = await embeddingResponse.json();
    const embedding = json.data[0].embedding;


    // Calling our supabase SQL search
    const { data: products, error } = await supabaseAdmin.rpc("product_search", {
      query_embedding: embedding,
      similarity_threshold: 0.7,
      match_count: matches,
    });

    if (error) {
      console.error("Supabase error:", error);
      return new Response("Error accessing product data", { status: 500 });
    }

    // Combining our results from Supabase and our LaunchDarkly/GPT service
    const results = { productResults: products, decision: decision };
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("API handler error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
