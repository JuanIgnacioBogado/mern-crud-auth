import { useCallback, useEffect, useState } from 'react';

export const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const manageErrors = useCallback(({ response: { data } }) => setErrors(data), []);

  useEffect(() => {
    if (errors.length) {
      const timer = setTimeout(() => setErrors([]), 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  return { errors, manageErrors };
};
