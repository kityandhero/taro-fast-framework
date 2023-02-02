import classNames from 'classnames';
import React, { useContext } from 'react';

import { isEqualBySerialize, isFunction } from 'easy-soft-utility';

export function withNativeProps(props, element) {
  const p = {
    ...element.props,
  };

  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }

  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }

  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }

  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue;
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }

  return React.cloneElement(element, p);
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,
 * @export
 */
export function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  const { match } = nextProps;

  if ((match || null) != null) {
    const { params } = match;

    if ((params || null) != null) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复, 则返回null,
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = { id: '' },
  parseUrlParamsForSetState = null,
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(
    nextProps,
    prevState,
  );

  stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };

  const { urlParams: urlParamsPrev } = prevState;

  const { urlParams } = stateUrlParams;

  if (
    isEqualBySerialize(
      { ...(urlParamsPrev || {}), ...{} },
      { ...(urlParams || {}), ...{} },
    )
  ) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);

    return { ...prevState, ...stateUrlParams, ...data };
  }

  return { ...prevState, ...stateUrlParams };
}

export const defaultConfigRef = {
  current: {},
};

export function setDefaultConfig(config) {
  defaultConfigRef.current = config;
}

export function getDefaultConfig() {
  return defaultConfigRef.current;
}

const ConfigContext = React.createContext(null);

export const ConfigProvider = (props) => {
  const { children, ...config } = props;
  const parentConfig = useConfig();

  return (
    <ConfigContext.Provider
      value={{
        ...parentConfig,
        ...config,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  return useContext(ConfigContext) ?? getDefaultConfig();
}
