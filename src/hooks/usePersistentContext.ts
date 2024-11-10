import { useEffect, useState } from 'react';

interface UserContext {
  key: string;
  kind: string;
  anonymous: boolean;
  custom?: {
    affinities?: string[];
    [key: string]: any;
  };
}

const defaultContext: UserContext = {
  key: `user-${Math.random().toString(36).substring(2, 15)}`, // Generate a unique key per session
  kind: 'user',
  anonymous: true,
  custom: {
    affinities: [],
  },
};

export function usePersistentContext() {
  // Initialize context from sessionStorage or use default if none is found
  const [context, setContext] = useState<UserContext>(() => {
    if (typeof window !== 'undefined') {
      const storedContext = sessionStorage.getItem('userContext');
      return storedContext ? JSON.parse(storedContext) : defaultContext;
    }
    return defaultContext; // Fallback for SSR (initial render)
  });

  // Update sessionStorage whenever context changes, only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userContext', JSON.stringify(context));
    }
  }, [context]);

  // Function to update the context with new affinities or other custom properties
  const updateContext = (newAffinity: string) => {
    setContext((prevContext) => {
      const updatedContext = { ...prevContext };
      if (!updatedContext.custom) updatedContext.custom = {};
      if (!updatedContext.custom.affinities) updatedContext.custom.affinities = [];

      // Only add the new affinity if it doesn't already exist
      if (!updatedContext.custom.affinities.includes(newAffinity)) {
        updatedContext.custom.affinities.push(newAffinity);
      }
      return updatedContext;
    });
  };

  return { context, updateContext };
}
