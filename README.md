This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This will have all the same npm run functions as a normal Next app so getting started on the whole will look the same.

However, for this app to function it will require some API keys defined in an .env.local file include the below - 

OPENAI_API_KEY=\
NEXT_PUBLIC_SUPABASE_URL=\
SUPABASE_SERVICE_ROLE_KEY=\
LAUNCH_DARKLY_SDK_KEY=\

(This is actually incomplete since there's a number of database set up steps that I'll have to come back to)

Primary features to note:\
ChatGPT Embeddings & ChatCompletion APIs\
LaunchDarkly Flag Evaluation & Segment Bucketing\

## High-Level Highlights for LaunchDarkly

This app is a ChatGPT embeddings search app primarily for an ecommerce product database search.

It also has enabled a LaunchDarkly feature flagging activation service. 

Currently this feature flag is a proof of concept that works explicitly for a Feature Flag named Gen Z Optimized Search with a key of gen-z-optimized-search. 

This feature flag is of a boolean type which will be served to the Gen Z Users segment. This segment is triggered upon the presence of a "Gen Z" value within an "affinities" custom array attribute on a User Context.

Within the app, as a user searches for products we simultaneously send an ChatGPT Embeddings search request for the products in our database alongside a ChatGPT Chat Completion request which is configured to analyze the search query that was entered, determine whether the searching user is in the a demographic related to a given Experiment/Flag and it's Description, give us a relevancy score based on it's confidence of a match, then return a structured set of arguments to pass into our evaluator function. If the relevancy score is above a certain threshold, we add a "Gen Z" value to the user's Context within the Affinities custom array attribute, which then activates our flag.

This activation then updates our React state and our sessionStorage in order to in effect bucket our user into a Gen Z segment on the client side for further personalization. Currently, for the sake of a proof of concept, the UX for search results and LaunchDarkly context results are barebones, and the functionality for dynamically analyzing demographic matching for a flag/segment is not fully fleshed out as both the search api route and the Home component have static values for this Gen Z use case.

## Codebase Highlights

There are a good bit of things happening here, so for the purpose of simplification, lets narrow down to areas of focus for the most pertinent functionality. 

*Home Component*

Starting with our *Home component* within our components folder, this is a client side component that manages the user input and results display. It makes the call to our api route within the api/product-search folder, passing the user input query, our desired product match count, and our LaunchDarkly user context.


*Search API Route*

Our search API route takes those values passed fans them out into 3 new processes. 

*1: Optimized Search Service & Dynamic Toggler*

The first is our LaunchDarkly evaluator located in the /services/ai-search/optimizedSearchService.ts file. This is executed in the API route with the exported *getFlagAndExperimentDecision* function. 

This function does two things. Using the *dynamicToggler* function it forwards our query and flag/experiment details to ChatGPT to evaluate whether the query matches with our feature flag returning a relevancy score and other contextual information. The second thing happening asynchronously alongside the dynamicToggler's process is LaunchDarkly's waitForActivation. Once these two processes have returned, we then update the User Context with an affinity if the relevancy score is high enough, which will flow downstream to tie them to the Gen Z focused segment and flag as we call our .variation() function to evaluate whether our gen-z flag should be activated.

*2: Embedding Generation*

The second part is sending our query to the ChatGPT embeddings model to create a vector that can be used for searching our vector database that has been set up in Supbase.

*3: Supabase Search Query*

Lastly, we send our query embedding vector to Supabase where a SQL function executes that retrieves a set of product data based on vector mapping relevancy and returns it.

*Search Return* 

The api route then sends back an object with product data and decision data regarding our LaunchDarkly segment/flag evaluation.


*UX Display & Context Persistence* 

Once the data is returned to our component, we render the product data and a side column view with the results from our LaunchDarkly evaluator. In addition to this, we update both our context state and sessionStorage with the upated User Context.

Feel free reach out with questions :)