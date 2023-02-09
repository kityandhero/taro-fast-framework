import { useCallback, useMemo, useRef, useState } from 'react';

export function useMemoizedFunction(function_) {
  if (
    process.env.NODE_ENV === 'development' &&
    typeof function_ !== 'function'
  ) {
    console.error(
      `useMemoizedFunction expected parameter is a function, got ${typeof function_}`,
    );
  }

  const functionReference = useRef(function_);

  functionReference.current = useMemo(() => function_, [function_]);

  const memoizedFunction = useRef();

  if (!memoizedFunction.current) {
    memoizedFunction.current = function (...arguments_) {
      return functionReference.current.apply(this, arguments_);
    };
  }

  return memoizedFunction.current;
}

export const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export function usePropertiesValue(options) {
  const { value, defaultValue, onChange } = options;

  const update = useUpdate();

  const stateReference = useRef(value === undefined ? defaultValue : value);
  if (value !== undefined) {
    stateReference.current = value;
  }

  const setState = useMemoizedFunction((v) => {
    if (value === undefined) {
      stateReference.current = v;
      update();
    }
    onChange?.(v);
  });
  return [stateReference.current, setState];
}
