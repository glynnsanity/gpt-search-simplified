import { openaiClient } from "../openai/openaiClient";

interface LDDynamicToggleProps {
  flag_name: string;
  relevance: number;
  reasoning: string;
  context_alignment: "low" | "medium" | "high";
}

interface ExperimentDetails {
  flag_name: string;
  description: string;
}

export class LDDynamicToggleConstructor {
  private async activateWithGPT(query: string, experiment: ExperimentDetails): Promise<LDDynamicToggleProps> {
    try {
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
                - Flag Name: ${experiment.flag_name}. ${experiment.description}`,         
          },
          { role: "user", content: query }
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
      
      const toolCallArrayResponse = response.choices[0].message.tool_calls;
      // @ts-ignore
      const toolCall = toolCallArrayResponse[0];

      if (toolCall?.function?.arguments) {
        return JSON.parse(toolCall.function.arguments);
      }

      return { flag_name: '', relevance: 0, reasoning: '', context_alignment: 'low' }
    } catch (error) {
      console.error('GPT activation failed:', error);
      return { flag_name: '', relevance: 0, reasoning: '', context_alignment: 'low' }
    }
  }

  public async activateExperimentDecision(query: string, experiment: ExperimentDetails): Promise<LDDynamicToggleProps> {
    const activateDecision = await this.activateWithGPT(query, experiment);
    return activateDecision;
  }
}