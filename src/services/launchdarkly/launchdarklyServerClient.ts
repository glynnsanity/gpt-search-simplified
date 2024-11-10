// services/launchdarkly/launchdarklyServerClient.ts
import * as ld from '@launchdarkly/node-server-sdk';
import { loadEnvConfig } from "@next/env";
loadEnvConfig("");

const sdkKey = process.env.LAUNCH_DARKLY_SDK_KEY || '';
let client: ld.LDClient | null = null;

export const getLaunchDarklyClient = (): ld.LDClient => {
  if (!client) {
    client = ld.init(sdkKey, {
      logger: ld.basicLogger({ level: 'debug' }), // Enable debug logging
    });
  }
  return client;
};
