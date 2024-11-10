import { LDDynamicToggleConstructor } from "@/services/dynamic-trigger/LDDynamicToggleConstructor";

const dynamicToggler = new LDDynamicToggleConstructor();

async function runTest() {
  const results = await dynamicToggler.activateExperimentDecision('I need some shoes that are not cringe', { flag_name: 'Exp0: GenZ-Optimized-Search', description: 'This experiment is intended to optimize search functionality specifically for Gen Z.'});
  console.log(results);
}

runTest();