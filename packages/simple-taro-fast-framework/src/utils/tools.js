import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  isString,
  isUndefined,
  removeToken,
  toString,
} from 'easy-soft-utility';

import { Divider } from 'taro-fast-component';
import { PrismCode } from 'taro-fast-component-prism';
import {
  removeCurrentCustomer,
  removeOpenId,
  removeSession,
} from 'taro-fast-framework';

import QQMapWX from '../libs/qqmap-wx-jssdk.min';

import { removeMetaDataCache } from './storageAssist';

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getQQMapWX() {
  const mapSdk = new QQMapWX({
    key: 'FHSBZ-INGWK-ANPJF-AJ4DG-LPTRS-HAFGY',
  });

  return mapSdk;
}

export function buildComponentProperties({ config, ignorePropertyList = [] }) {
  let result = '';

  for (const d of Object.entries(config)) {
    const [key, value] = d;

    const keyAdjust = key.startsWith('--') ? `\\"${key}\\"` : key;

    if (!isUndefined(value)) {
      if (isBoolean(value) && value) {
        result = result + `${keyAdjust} `;
      } else if (isString(value)) {
        result = result + `${keyAdjust}="${value}" `;
      } else if (isFunction(value)) {
        if (
          isArray(ignorePropertyList) &&
          checkInCollection(ignorePropertyList, keyAdjust)
        ) {
          result = result + `${keyAdjust}={() => {...}} `;

          result;
          continue;
        }

        const s = toString(value);

        result =
          result +
          `${keyAdjust}={${s
            .replace(/function[\W\w]*?\(/, '(')
            .replace(/\)\s*{/, ') => {')}} `;
      } else if (isObject(value) || isArray(value)) {
        if (checkInCollection(ignorePropertyList, keyAdjust)) {
          result = result + `${keyAdjust}={...} `;
          continue;
        }

        let s = JSON.stringify(
          value,
          (k, v) => {
            if (checkInCollection(ignorePropertyList, k)) {
              return '{...}';
            }

            return v;
          },
          '\t',
        );

        if (isUndefined(s)) {
          result = result + `${keyAdjust}={''} `;
        } else {
          const matchCollection = s.match(/"[^-]\S*": /g);

          if (isArray(matchCollection) && matchCollection.length > 0) {
            for (const o of matchCollection) {
              s = s.replace(o, o.replace(/"/g, ''));
            }
          }

          result = result + `${keyAdjust}={${s}} `;
        }
      } else {
        result = result + `${keyAdjust}={${toString(value)}} `;
      }
    }
  }

  return result;
}

export function buildProperties({ config, ignorePropertyList = [] }) {
  let result = '\r\n  ';

  const entries = Object.entries(config);

  const entryLength = entries.length;

  for (const [index, d] of entries.entries()) {
    const [key, value] = d;

    const keyAdjust = key.startsWith('--') ? `\\"${key}\\"` : key;

    if (!isUndefined(value)) {
      result = result + '\r\n  ';

      if (isBoolean(value) && value) {
        result = result + `${keyAdjust} = ${value}; `;
      } else if (isString(value)) {
        result = value.includes('=>')
          ? result + `${keyAdjust} = ${value}; `
          : result + `${keyAdjust} = "${value}"; `;
      } else if (isFunction(value)) {
        if (
          isArray(ignorePropertyList) &&
          checkInCollection(ignorePropertyList, keyAdjust)
        ) {
          result = result + `${keyAdjust} = "() => {...}"; `;

          result;
          continue;
        }

        const s = toString(value);

        result =
          result +
          `${keyAdjust} = ${s
            .replace(/function[\W\w]*?\(/, '(')
            .replace(/\)\s*{/, ') => {')}; `;
      } else if (isObject(value) || isArray(value)) {
        if (checkInCollection(ignorePropertyList, keyAdjust)) {
          result = result + `${keyAdjust}="..."; `;
          continue;
        }

        let s = JSON.stringify(
          value,
          (k, v) => {
            if (checkInCollection(ignorePropertyList, k)) {
              return '"...";';
            }

            return v;
          },
          '\t',
        );

        if (isUndefined(s)) {
          result = result + `${keyAdjust}=''; `;
        } else {
          const matchCollection = s.match(/"[^-]\S*": /g);

          if (isArray(matchCollection) && matchCollection.length > 0) {
            for (const o of matchCollection) {
              s = s.replace(o, o.replace(/"/g, ''));
            }
          }

          result = result + `${keyAdjust} = ${s}; `;
        }
      } else {
        result = result + `${keyAdjust} = ${toString(value)}; `;
      }

      if (index !== entryLength - 1) {
        result = result + '\r\n  ';
      }
    }
  }

  return result;
}

export function buildComponentPrismCode({
  componentName,
  config,
  mockChildren,
  ignorePropertyList = [],
  showDivider = true,
}) {
  if (checkStringIsNullOrWhiteSpace(componentName)) {
    return null;
  }

  let code = '';

  code = mockChildren
    ? `<${componentName} ${buildComponentProperties({
        config,
        ignorePropertyList,
      })}>...</${componentName}>`
    : `<${componentName} ${buildComponentProperties({
        config,
        ignorePropertyList,
      })} />`;

  return (
    <>
      {showDivider ? (
        <Divider contentPosition="left">代码示例 点击复制</Divider>
      ) : null}

      <PrismCode canCopy code={code} language="jsx" />
    </>
  );
}

export function buildPagePrismCode({
  config,
  renderCodeList = [],
  ignorePropertyList = [],
  showDivider = true,
}) {
  let renderCode = '';
  if (renderCodeList.length === 0) {
    renderCode = '...';
  } else {
    for (const [index, one] of renderCodeList.entries()) {
      renderCode =
        renderCode +
        `${index === 0 ? '' : '\t  '}{${one}}${
          index === renderCodeList.length - 1 ? '' : '\r\n'
        }`;
    }
  }

  let code = `import { connect } from 'easy-soft-dva';
import { View } from '@tarojs/components';

import { AuthorizationWrapper } from 'taro-fast-framework';

@connect(({ session, entrance, global, schedulingControl }) => ({
  session,
  entrance,
  global,
  schedulingControl,
}))
export default class Index extends AuthorizationWrapper {${buildProperties({
    config,
    ignorePropertyList,
  })}

  renderFurther() {
    return (
      <View>
      ${renderCode}
      </View>
    );
  }
}`;

  return (
    <>
      {showDivider ? (
        <Divider contentPosition="left">代码示例 点击复制</Divider>
      ) : null}

      <PrismCode canCopy code={code} language="jsx" />
    </>
  );
}

export function clearLocalDataWhenSimulationModeChanged() {
  removeMetaDataCache();
  removeSession();
  removeOpenId();
  removeToken();
  removeCurrentCustomer();
}
