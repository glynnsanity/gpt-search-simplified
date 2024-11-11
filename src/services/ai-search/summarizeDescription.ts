import { openaiClient } from "../openai/openaiClient";



export async function summarizeDescription(model: string, temperature: number, description: string) {
  try {
    const response = await openaiClient.chat.completions.create({
      model: model,
      temperature: temperature,
      messages: [
        { role: "system",
          content: `You are tasked with analyzing a set of HTML which contains description data for a product. 
                    Your analysis is for the purpose of summarizing the description contained in the HTML of a product page description.
                    The summary you make should only be a single sentence and should have a light-hearted feel encouraging the customer to learn more.
                    The summary should be engaging and emphasize the product's unique aspects to make the viewer understand the product and feel intrigued.
                    Each summary should have unique language that would not be repeated in subsequent summaries`,        
        },
        { role: "user", content: description }
      ],
    });

    const chatgptResponse = response ? response.choices[0].message.content : 'No response. Error occurred.'
    return chatgptResponse;
  } catch(error) {
    console.log('Error occurred in summaryDescription function: ', error)
    return 'Check logs: error occurred in summaryDescription function'
  }
}