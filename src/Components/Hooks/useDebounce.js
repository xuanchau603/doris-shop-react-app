import { useState, useEffect } from "react";

function useDebounce(value, timeout) {
  const [debounceValue, setDebouneValue] = useState("");

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouneValue(value);
    }, timeout);

    return () => clearTimeout(timerID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
}

export default useDebounce;
