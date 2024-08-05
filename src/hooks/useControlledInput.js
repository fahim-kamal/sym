import { useState } from "react";

export const useControlledInput = (
  initial = "",
  validateCallback = () => {}
) => {
  const [input, setInput] = useState(initial);

  const onInputChange = (event) => {
    setInput(event.target.value);
    validateCallback(event.target.value);
  };

  return { input, setInput, onInputChange };
};
