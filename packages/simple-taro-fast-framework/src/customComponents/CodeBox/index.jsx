import { Component } from 'react';
import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import {
  isArray,
  isObject,
  isFunction,
  isBoolean,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';

import { Card, ColorText } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const defaultProps = {
  header: '代码示例 点击复制',
  config: {},
  componentName: '',
  labelWidth: 80,
  description: null,
  mockChildren: true,
};

class CodeBox extends Component {
  buildConfig = () => {
    const { config } = this.props;

    let result = '';

    Object.entries(config).forEach((d) => {
      const [key, value] = d;

      if (isBoolean(value) && value) {
        result = result + `${key} `;
      } else if (isString(value)) {
        result = result + `${key}="${value}" `;
      } else if (isFunction(value)) {
        result = result + `${key}={${toString(value)}} `;
      } else if (isObject(value) || isArray) {
        result = result + `${key}={${JSON.stringify(value)}} `;
      } else {
        result = result + `${key}={${toString(value)}} `;
      }
    });

    return result;
  };

  render() {
    const { header, description, componentName, mockChildren } = this.props;

    if (stringIsNullOrWhiteSpace(componentName)) {
      return null;
    }

    let code = '';

    if (mockChildren) {
      code = `<${componentName} ${this.buildConfig()}>...</${componentName}>`;
    } else {
      code = `<${componentName} ${this.buildConfig()} />`;
    }

    return (
      <Card
        strip
        stripLeft={2}
        stripWidth={6}
        stripColor="#ccc"
        header={header || '示例'}
        style={style}
        headerStyle={cardHeaderStyle}
        footer={
          stringIsNullOrWhiteSpace(description || null)
            ? null
            : `备注: ${description}.`
        }
      >
        <View>
          <ColorText
            color="#999"
            text={code}
            textStyle={{
              fontSize: transformSize(26),
              lineHeight: transformSize(32),
            }}
            canCopy
          />
        </View>
      </Card>
    );
  }
}

CodeBox.defaultProps = {
  ...defaultProps,
};

export default CodeBox;
