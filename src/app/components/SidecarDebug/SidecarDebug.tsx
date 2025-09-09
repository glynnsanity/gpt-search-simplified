"use client";

import { useEffect, useState } from 'react';

export default function SidecarDebug() {
  const [sidecarStatus, setSidecarStatus] = useState<{
    isInitialized: boolean;
    client: any;
    config: any;
  }>({
    isInitialized: false,
    client: null,
    config: null
  });

  useEffect(() => {
    const checkSidecar = () => {
      if (typeof window !== 'undefined' && window.LDSidecar) {
        setSidecarStatus({
          isInitialized: window.LDSidecar.isInitialized(),
          client: window.LDSidecar.getClient(),
          config: window.LDSidecar.getConfig()
        });
      }
    };

    // Check immediately
    checkSidecar();

    // Check again after a delay to ensure initialization
    const timer = setTimeout(checkSidecar, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleReapply = async () => {
    if (window.LDSidecar) {
      await window.LDSidecar.reapply();
    }
  };

  const handleRestore = () => {
    if (window.LDSidecar) {
      window.LDSidecar.restore();
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm max-w-sm">
      <h3 className="font-bold mb-2">LD Sidecar Debug</h3>
      <div className="space-y-1">
        <div>
          <span className="font-semibold">Initialized:</span>{' '}
          <span className={sidecarStatus.isInitialized ? 'text-green-400' : 'text-red-400'}>
            {sidecarStatus.isInitialized ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <span className="font-semibold">Client:</span>{' '}
          <span className={sidecarStatus.client ? 'text-green-400' : 'text-red-400'}>
            {sidecarStatus.client ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div>
          <span className="font-semibold">Config:</span>{' '}
          <span className={sidecarStatus.config ? 'text-green-400' : 'text-red-400'}>
            {sidecarStatus.config ? 'Loaded' : 'Not Loaded'}
          </span>
        </div>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={handleReapply}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
        >
          Reapply
        </button>
        <button
          onClick={handleRestore}
          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
        >
          Restore
        </button>
      </div>
    </div>
  );
}
