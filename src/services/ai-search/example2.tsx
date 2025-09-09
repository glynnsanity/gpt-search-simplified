// index.js
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

const renderApp = async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: 'client-side-id-123abc',
    context: {
      kind: 'user',
      key: 'context-key-123abc',
      name: 'Customer Demo',
    },
  });

  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <LDProvider>
          <App />
        </LDProvider>
      </StrictMode>
    );
  }
};

renderApp();



// app.js
import React, { useEffect } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import ReactGA from 'react-ga4';

export default function App() {
  const flags = useFlags();          // Access feature flags
  const ldClient = useLDClient();    // Access LaunchDarkly client

  useEffect(() => {
    // OPTIONAL: re-identify the user in LaunchDarkly when necessary
    ldClient?.identify({ key: 'context-key-123abc', custom: { newAttribute: 'newContextInformation' } });

    ReactGA.initialize('G-XXXXXXX');
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, [ldClient]);

  useEffect(() => {
    if (flags.newFeatureEnabled) {
      // Track the exposure to a feature flag variant
      ReactGA.event({
        category: 'Feature',
        action: 'New Feature Shown',
        label: 'newFeatureEnabled'
      });
    }
  }, [flags]);

  return (
    <div>
      {flags.newFeatureEnabled ? (
        <p>The new feature is enabled 🎉</p>
      ) : (
        <p>You're seeing the classic experience.</p>
      )}
    </div>
  );
}

