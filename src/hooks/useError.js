import { useState } from "react";

export const useError = (validateCallback) => {
  const [error, setError] = useState(null);

  const validate = (val) => {
    const { status, value } = validateCallback(val);

    if (status == "error") setError(value);
    else setError(null);
  };

  return { error, setError, validate };
};
