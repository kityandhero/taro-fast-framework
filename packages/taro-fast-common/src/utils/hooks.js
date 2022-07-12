import { useCallback, useMemo, useRef, useState } from 'react';

export function useMemoizedFn(fn) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(
        `useMemoizedFn expected parameter is a function, got ${typeof fn}`,
      );
    }
  }

  const fnRef = useRef(fn);

  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef();

  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current;
}

export const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export function usePropsValue(options) {
  const { value, defaultValue, onChange } = options;

  const update = useUpdate();

  const stateRef = useRef(value !== undefined ? value : defaultValue);
  if (value !== undefined) {
    stateRef.current = value;
  }

  const setState = useMemoizedFn((v) => {
    if (value === undefined) {
      stateRef.current = v;
      update();
    }
    onChange?.(v);
  });
  return [stateRef.current, setState];
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
