import {
  stringIsNullOrWhiteSpace,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isBoolean,
  isFunction,
  isObject,
  isString,
  isUndefined,
} from 'taro-fast-common/es/utils/typeCheck';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import { Divider } from 'taro-fast-component/es/customComponents';
import { PrismCode } from 'taro-fast-component-prism/es/customComponents';

export function buildConfig({ config, ignorePropertyList = [] }) {
  let result = '';

  Object.entries(config).forEach((d) => {
    const [key, value] = d;

    if (!isUndefined(value)) {
      if (isBoolean(value) && value) {
        result = result + `${key} `;
      } else if (isString(value)) {
        result = result + `${key}="${value}" `;
      } else if (isFunction(value)) {
        if (
          isArray(ignorePropertyList) &&
          inCollection(ignorePropertyList, key)
        ) {
          return (result = result + `${key}={() => {...}} `);
        }

        result =
          result +
          `${key}={${toString(value)
            .replace(/function .*?\(/, '(')
            .replace(/\) {/, ') => {')}} `;
      } else if (isObject(value) || isArray(value)) {
        if (inCollection(ignorePropertyList, key)) {
          return (result = result + `${key}={...} `);
        }

        let s = JSON.stringify(
          value,
          (k, v) => {
            if (inCollection(ignorePropertyList, k)) {
              return '{...}';
            }

            return v;
          },
          '\t',
        );

        if (isUndefined(s)) {
          result = result + `${key}={''} `;
        } else {
          const matchCollection = s.match(/"[\S]*": /g);

          if (isArray(matchCollection) && matchCollection.length > 0) {
            matchCollection.forEach((o) => {
              s = s.replace(o, o.replace(/"/g, ''));
            });
          }

          result = result + `${key}={${s}} `;
        }
      } else {
        result = result + `${key}={${toString(value)}} `;
      }
    }
  });

  return result;
}

export function buildPrismCode({
  componentName,
  config,
  mockChildren,
  ignorePropertyList = [],
  showDivider = true,
}) {
  if (stringIsNullOrWhiteSpace(componentName)) {
    return null;
  }

  let code = '';

  if (mockChildren) {
    code = `<${componentName} ${buildConfig({
      config,
      ignorePropertyList,
    })}>...</${componentName}>`;
  } else {
    code = `<${componentName} ${buildConfig({
      config,
      ignorePropertyList,
    })} />`;
  }

  return (
    <>
      {showDivider ? (
        <Divider contentPosition="left">代码示例 点击复制</Divider>
      ) : null}

      <PrismCode canCopy code={code} language="jsx" />
    </>
  );
}
