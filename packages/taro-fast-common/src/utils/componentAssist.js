import classNames from 'classnames';
import React, { useContext } from 'react';

import { isEqualBySerialize, isFunction } from 'easy-soft-utility';

export function withNativeProperties(properties, element) {
  const p = {
    ...element.props,
  };

  if (properties.className) {
    p.className = classNames(element.props.className, properties.className);
  }

  if (properties.style) {
    p.style = {
      ...p.style,
      ...properties.style,
    };
  }

  if (properties.tabIndex !== undefined) {
    p.tabIndex = properties.tabIndex;
  }

  for (const key in properties) {
    if (!Object.prototype.hasOwnProperty.call(properties, key)) continue;
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = properties[key];
    }
  }

  return React.cloneElement(element, p);
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,
 * @export
 */
export function getDerivedStateFromPropertiesForUrlParametersCore(
  nextProperties,
) {
  const { match } = nextProperties;

  if ((match || null) != undefined) {
    const { params } = match;

    if ((params || null) != undefined) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复, 则返回null,
 * @export
 */
export function getDerivedStateFromPropertiesForUrlParameters(
  nextProperties,
  previousState,
  defaultUrlParameters = null,
  parseUrlParametersForSetState = null,
) {
  let stateUrlParameters = getDerivedStateFromPropertiesForUrlParametersCore(
    nextProperties,
    previousState,
  );

  stateUrlParameters = stateUrlParameters || {
    urlParams: defaultUrlParameters || { id: '' },
  };

  const { urlParams: urlParametersPrevious } = previousState;

  const { urlParams } = stateUrlParameters;

  if (isEqualBySerialize({ ...urlParametersPrevious }, { ...urlParams })) {
    return previousState;
  }

  if (isFunction(parseUrlParametersForSetState)) {
    const data = parseUrlParametersForSetState(stateUrlParameters);

    return { ...previousState, ...stateUrlParameters, ...data };
  }

  return { ...previousState, ...stateUrlParameters };
}

export const defaultConfigReference = {
  current: {},
};

export function setDefaultConfig(config) {
  defaultConfigReference.current = config;
}

export function getDefaultConfig() {
  return defaultConfigReference.current;
}

const ConfigContext = React.createContext(null);

export const ConfigProvider = (properties) => {
  const { children, ...config } = properties;
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
