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

export function buildComponentProps({ config, ignorePropertyList = [] }) {
  let result = '';

  Object.entries(config).forEach((d) => {
    const [key, value] = d;

    const keyAdjust = key.startsWith('--') ? `\"${key}\"` : key;

    if (!isUndefined(value)) {
      if (isBoolean(value) && value) {
        result = result + `${keyAdjust} `;
      } else if (isString(value)) {
        result = result + `${keyAdjust}="${value}" `;
      } else if (isFunction(value)) {
        if (
          isArray(ignorePropertyList) &&
          inCollection(ignorePropertyList, keyAdjust)
        ) {
          result = result + `${keyAdjust}={() => {...}} `;

          return result;
        }

        const s = toString(value);

        result =
          result +
          `${keyAdjust}={${s
            .replace(/function[\w\W]*?\(/, '(')
            .replace(/\)[\s]*{/, ') => {')}} `;
      } else if (isObject(value) || isArray(value)) {
        if (inCollection(ignorePropertyList, keyAdjust)) {
          return (result = result + `${keyAdjust}={...} `);
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
          result = result + `${keyAdjust}={''} `;
        } else {
          const matchCollection = s.match(/"[^-][\S]*": /g);

          if (isArray(matchCollection) && matchCollection.length > 0) {
            matchCollection.forEach((o) => {
              s = s.replace(o, o.replace(/"/g, ''));
            });
          }

          result = result + `${keyAdjust}={${s}} `;
        }
      } else {
        result = result + `${keyAdjust}={${toString(value)}} `;
      }
    }
  });

  return result;
}

export function buildProperties({ config, ignorePropertyList = [] }) {
  let result = '';

  Object.entries(config).forEach((d) => {
    const [key, value] = d;

    const keyAdjust = key.startsWith('--') ? `\"${key}\"` : key;

    if (!isUndefined(value)) {
      result = result + '\r\n  ';

      if (isBoolean(value) && value) {
        result = result + `${keyAdjust} = ${value}; `;
      } else if (isString(value)) {
        result = result + `${keyAdjust} = "${value}"; `;
      } else if (isFunction(value)) {
        if (
          isArray(ignorePropertyList) &&
          inCollection(ignorePropertyList, keyAdjust)
        ) {
          result = result + `${keyAdjust} = "() => {...}"; `;

          return result;
        }

        const s = toString(value);

        result =
          result +
          `${keyAdjust} = ${s
            .replace(/function[\w\W]*?\(/, '(')
            .replace(/\)[\s]*{/, ') => {')}; `;
      } else if (isObject(value) || isArray(value)) {
        if (inCollection(ignorePropertyList, keyAdjust)) {
          return (result = result + `${keyAdjust}="..."; `);
        }

        let s = JSON.stringify(
          value,
          (k, v) => {
            if (inCollection(ignorePropertyList, k)) {
              return '"...";';
            }

            return v;
          },
          '\t',
        );

        if (isUndefined(s)) {
          result = result + `${keyAdjust}=''; `;
        } else {
          const matchCollection = s.match(/"[^-][\S]*": /g);

          if (isArray(matchCollection) && matchCollection.length > 0) {
            matchCollection.forEach((o) => {
              s = s.replace(o, o.replace(/"/g, ''));
            });
          }

          result = result + `${keyAdjust} = ${s}; `;
        }
      } else {
        result = result + `${keyAdjust} = ${toString(value)}; `;
      }
    }
  });

  return result;
}

export function buildComponentPrismCode({
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
    code = `<${componentName} ${buildComponentProps({
      config,
      ignorePropertyList,
    })}>...</${componentName}>`;
  } else {
    code = `<${componentName} ${buildComponentProps({
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

export function buildPagePrismCode({
  config,
  ignorePropertyList = [],
  showDivider = true,
}) {
  let code = `import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { AuthorizationWrapper } from 'taro-fast-framework/es/framework';

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
    return (<View>...</View>);
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
