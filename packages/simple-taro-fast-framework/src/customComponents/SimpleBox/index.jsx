import { Component } from 'react';
import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import {
  isArray,
  isFunction,
  isObject,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import {
  Card,
  ColorText,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';
import { buildPrismCode } from '../../utils/tools';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const defaultProps = {
  space: true,
  header: '',
  prefix: '示例',
  helpTitle: '示例配置',
  config: {},
  description: null,
  extra: null,
  componentName: '',
  mockChildren: true,
};

class SimpleBox extends Component {
  buildList = () => {
    const { config } = this.props;

    const list = Object.entries(config).map((d) => {
      const [key, value] = d;

      return {
        text: `${key}: ${
          isFunction(value)
            ? 'function'
            : isObject(value) || isArray(value)
            ? JSON.stringify(value)
            : toString(value)
        }`,
        ellipsis: true,
      };
    });

    return list;
  };

  buildCode = () => {
    const { componentName, config, mockChildren } = this.props;

    return buildPrismCode({ componentName, config, mockChildren });
  };

  buildFooter = () => {
    const { description } = this.props;

    let listData = [];

    if (isString(description)) {
      if (stringIsNullOrWhiteSpace(description || null)) {
        return null;
      }

      listData.push({
        text: description,
      });
    }

    if (isArray(description)) {
      listData = description;
    }

    if (listData.length > 0) {
      return <HelpBox showTitle={false} showNumber={false} list={listData} />;
    }

    if (isObject(description)) {
      return description;
    }
  };

  render() {
    const { space, prefix, header, helpTitle, extra, useInnerBox, children } =
      this.props;

    const list = this.buildList();

    const footer = this.buildFooter();

    return (
      <Card
        strip
        stripLeft={2}
        stripWidth={6}
        stripColor="#3378f4"
        header={
          <ColorText
            textPrefix={prefix}
            text={header}
            separatorStyle={{ padding: `0 ${transformSize(5)}` }}
          />
        }
        style={style}
        headerStyle={cardHeaderStyle}
        footer={footer}
        space={space}
        extra={extra}
        useInnerBox={false}
      >
        {useInnerBox ? (
          <View
            style={{
              width: 'calc(100% - var(--tfc-11) * 2)',
              minHeight: transformSize(120),
              border: 'var(--tfc-1) solid #ccc',
              padding: 'var(--tfc-10) var(--tfc-10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            fillHeight={false}
          >
            {children}
          </View>
        ) : (
          children
        )}

        {list.length > 0 ? (
          <HelpBox
            title={helpTitle}
            showTitle
            showDivider
            showNumber={false}
            list={this.buildList()}
          />
        ) : null}

        {this.buildCode()}
      </Card>
    );
  }
}

SimpleBox.defaultProps = {
  ...defaultProps,
};

export default SimpleBox;
