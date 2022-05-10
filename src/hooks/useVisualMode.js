import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Sets transition history to new mode
  // replace represents if history has to skip the last mode
  // in history (ie. error from api server)
  const transition = (newMode, replace = false) => {
    setHistory((prev) =>
      replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode]
    );

    setMode(newMode);
  };

  // Sets mode to previous mode
  const back = () => {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setMode(historyCopy.slice(-1)[0]);
      setHistory(historyCopy);
    }
  };

  return { mode, transition, back };
}
