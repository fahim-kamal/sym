import { useState } from "react";

export const useControlledInput = (initial = "") => {
  const [input, setInput] = useState(initial);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  return { input, setInput, onInputChange };
};
