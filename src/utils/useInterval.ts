import React, { useState, useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number): void => {
  const defaultCallback = () => {}; // ts will complain if no default
  const savedCallback = useRef(defaultCallback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
