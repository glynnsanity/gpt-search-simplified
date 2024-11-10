// services/experimentHelper.ts
import { getLaunchDarklyClient } from '../launchdarkly/launchdarklyServerClient';
import { LDDynamicToggleConstructor } from '@/services/dynamic-trigger/LDDynamicToggleConstructor';

const ldClient = getLaunchDarklyClient();
const dynamicToggler = new LDDynamicToggleConstructor({ model: 'gpt-4o', temperature: 0.3 });

interface ExperimentDecisionParams {
  flag_name: string;
  description: string;
}

interface UserContext {
  key: string;
  kind: string;
  anonymous?: boolean;
  custom?: {
    affinities?: string[];
  };
}

// Update the context based on GPT decision
function updateUserContext(
  currentContext: UserContext,
  activationDecision: { addAffinity: string }
): UserContext {
  const newContext = { ...currentContext };

  if (!newContext.custom) newContext.custom = {};
  if (!newContext.custom.affinities) newContext.custom.affinities = ['Quick Test'];

  // Add the new affinity only if it isn’t already in the array
  if (!newContext.custom.affinities.includes(activationDecision.addAffinity)) {
    newContext.custom.affinities.push(activationDecision.addAffinity);
  }

  return newContext;
}

export async function getFlagAndExperimentDecision(query: string, params: ExperimentDecisionParams, clientContext: UserContext) {
  const [, gptActivationDecision] = await Promise.all([
    ldClient.waitForInitialization(), // Wait for LaunchDarkly client initialization
    dynamicToggler.activateExperimentDecision(query, params) // API call for experiment decision
  ]);


  /* -- Option for initializing the dynamicToggler after evaluating an experiment for ChatGPT models -- */
  /* 
    await ldClient.waitForInitialization();
    const ldModelJSON = await ldClient.jsonVariation('chat-gpt-model-test', clientContext, false);
    const experimentalDynamicToggler = new LDDynamicToggleConstructor(ldModelJSON)
  */

    
  // Update the context based on GPT decision
  const activate = gptActivationDecision.relevance > 0.7;
  const updatedContext = activate
    ? updateUserContext(clientContext, { addAffinity: 'Gen Z' })
    : clientContext;


  // Pass the updated context to LaunchDarkly to evaluate the flag
  console.log("Using userContext:", updatedContext);
  const ldFlagDecision = await ldClient.variationDetail('gen-z-optimized-search', updatedContext, false);

  ldClient.track("user-searched", clientContext, {
    query: query, // Optional data associated with the event
  });

  return { ldFlagDecision, gptActivationDecision };
}
