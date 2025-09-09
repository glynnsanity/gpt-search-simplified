"use client";

import Script from "next/script";

export default function LDSidecarLoader() {
  return (
    <Script
      src="/ld-sidecar.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && (window as any).LDSidecar) {
          (window as any).LDSidecar.init({
            clientSideID:
              process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID || "",
            flagKey: "sidecar-homepage",
            stream: true,
            spa: true,
            privacy: {
              dnt: true,
              gpc: true,
              requireConsent: false,
            },
            debug: process.env.NODE_ENV === "development",
          });
        }
      }}
    />
  );
}


