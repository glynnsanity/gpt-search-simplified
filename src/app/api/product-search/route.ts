// app/api/product-search/route.ts

import { supabaseAdmin } from '@/services/supabase/supabaseAdmin';
import { getFlagAndExperimentDecision } from '@/services/ai-search/optimizedSearchService';
import fs from 'fs';

interface UserContext {
  key: string;
  kind: string;
  anonymous: boolean;
  custom?: {
    affinities?: string[];
    [key: string]: any;
  };
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const config = {
  runtime: "edge",
};

function writeFileForTesting(embeddingArray: any){
  fs.writeFile('embedding.json', JSON.stringify(embeddingArray), (err) => {
    if (err) {
      console.error('Error writing embedding to file:', err);
    } else {
      console.log('Embedding saved to embedding.json');
    }
  });
}

// Handle POST request
export async function POST(req: Request): Promise<Response> {
  try {
    const { query, matches, clientContext } = (await req.json()) as {
      query: string;
      matches: number;
      clientContext: UserContext;
    };

    console.log("Received API request with query:", query);

    /* LaunchDarkly Feature Decision */
    console.log('Starting launchdarkly feature evalution');
    const decision = await getFlagAndExperimentDecision(query, { flag_name: 'Gen Z Optimized Search', description: 'This experiment is intended to optimize search functionality specifically for Gen Z.'}, clientContext)


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
    writeFileForTesting(embedding);

    console.log("Calling Supabase RPC 'product_search' with embedding and params.");
    const { data: products, error } = await supabaseAdmin.rpc("product_search", {
      query_embedding: embedding,
      similarity_threshold: 0.7,
      match_count: matches,
    });

    if (error) {
      console.error("Supabase error:", error);
      return new Response("Error accessing product data", { status: 500 });
    }

    console.log("LaunchDarkly results", decision);

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
