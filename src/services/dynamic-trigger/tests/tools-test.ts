import { openaiClient } from "@/services/openai/openaiClient";

async function runTest(){
  const response = await openaiClient.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    messages: [
      { role: "system",
        content: `You are an assistant that evaluates relevance for specific demographic-based LaunchDarkly experiment flags for the purpose of audience segmentation. 
            Score relevance for each flag based on:
            1. **Demographic Cues**: Consider any implied or explicit age-related cues.
            2. **Intent and Style**: Determine if the query suggests any stylistic preferences or trends.
            3. **Language**: Assess if the language (e.g., slang or terms like 'cringe') suggests a younger or older audience.

            Structure your reasoning by starting with the relevance of demographics, followed by intent/style. Avoid over-interpreting ambiguous language.
            
            Here are the experiment flags to assess with details on the desired segments to target:
            - Flag Name: "Exp0: Gen Z Optimized Search". Experiment Hypothesis: "We believe that showing content related specifically to Gen Z during their search for products will improve overall site engagement".`,         
      },
      { role: "user", content: `Help me find some shoes for my first semester in college` }
    ],
    tool_choice: "required",
    tools: [{
      type: "function",
      function: {
        name: 'activateExperiment',
        description: "Activates a LaunchDarkly flag based on user query match.",
        parameters: {
          type: "object",
          properties: {
            flag_name: {
              type: "string",
              description: "The name of the LaunchDarkly flag to activate."
            },
            relevance: {
              type: "number",
              description: "Relevance score between 0 and 1 indicating how well the query matches the flag."
            },
            reasoning: {
              type: 'string',
              description: 'Reasoning for confidence score',
            },
            context_alignment: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: 'Estimation on how successfull the experiment might be for the given use case'
            }
          },
          required: ["flag_name", "confidence", "reasoning", "context_alignment"],
          additionalProperties: false,
        },
      }
    }]
  });
  // @ts-ignore
  if (response) console.log('Initial response ', response.choices[0].message.tool_calls[0].function.arguments);
}
runTest();




