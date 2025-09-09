// TypeScript declarations for LD Sidecar
declare global {
  interface Window {
    LDSidecar: {
      init: (config: {
        clientSideID: string;
        flagKey: string;
        stream?: boolean;
        spa?: boolean;
        privacy?: {
          dnt?: boolean;
          gpc?: boolean;
          requireConsent?: boolean;
        };
        debug?: boolean;
      }) => Promise<void>;
      getClient: () => any;
      getConfig: () => any;
      isInitialized: () => boolean;
      reapply: () => Promise<void>;
      restore: () => void;
    };
  }
}

export {};
