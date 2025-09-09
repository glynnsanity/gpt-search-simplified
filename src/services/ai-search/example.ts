import { getLaunchDarklyClient } from '../launchdarkly/launchdarklyServerClient';
const ldClient = getLaunchDarklyClient();

const userContext = {
    key: '',
    kind: "email-instance",
    custom: {
        tier: ['Loyalty Tier 1'],
        visitorType: ['New Visitor', 'Return Visitor'], 
        deviceType: 'tablet',
        country: 'US',
        generationAffinity: 'Gen Z',
        region: ['Northeast', 'New York'],
        newAttribute: 'value',
        language: 'EN',
        primaryKey: ['1245']
    },
};

ldClient.identify(userContext)

await ldClient.waitForInitialization();
const variantDecision = await ldClient.variationDetail('exp-app-homepage-component-sort-test', userContext, 'control');

// simple if/then
if (variantDecision) {
    // show variation
} else {
    // do control 
}



ldClient.track("time-to-complete", userContext, {
    productType: 'Promotional Item', // Optional data associated with the event
});