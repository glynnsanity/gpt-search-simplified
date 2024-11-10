import * as LaunchDarkly from 'launchdarkly-node-client-sdk';
import { loadEnvConfig } from "@next/env";
loadEnvConfig("");

const sdkKey = process.env.LAUNCH_DARKLY_SDK_KEY || '';

const context = {
  kind: 'user',
  anonymous: true,
  affinities: []
};

export const client = LaunchDarkly.initialize(sdkKey, context);


