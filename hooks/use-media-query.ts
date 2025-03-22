'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Default to false on the server or in environments without window
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Early return if window doesn't exist (SSR)
    if (typeof window === 'undefined') {
      return;
    }

    // Create the media query list
    const mediaQueryList = window.matchMedia(query);

    // Update the state initially
    setMatches(mediaQueryList.matches);

    // Define listener for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    try {
      // Modern browsers
      mediaQueryList.addEventListener('change', listener);
    } catch (e) {
      // Older browsers
      try {
        mediaQueryList.addListener(listener);
      } catch (e) {
        console.error('Media query API not supported', e);
      }
    }

    // Clean up
    return () => {
      try {
        // Modern browsers
        mediaQueryList.removeEventListener('change', listener);
      } catch (e) {
        // Older browsers
        try {
          mediaQueryList.removeListener(listener);
        } catch (e) {
          console.error('Media query API not supported', e);
        }
      }
    };
  }, [query]);

  return matches;
} 