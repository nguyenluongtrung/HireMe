'use client';
import { createContext, useState, ReactNode } from 'react';

import Spinner from '@/components/ui/spinner';

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  const setIsLoading = (value: boolean) => setLoading(value);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="z-[999] fixed inset-0 flex items-center justify-center">
          {/* semi-transparent background */}
          <div className="absolute inset-0 bg-slate-100 opacity-50" />

          {/* spinner stays full opacity */}
          <Spinner />
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
