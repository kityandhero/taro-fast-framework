import { Component } from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  isString,
  isUndefined,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Card, DataGrid, HelpBox, Space } from 'taro-fast-component';

import { cardHeaderStyle, cardStyle } from '../../customConfig';

const style = {
  backgroundColor: '#f5f7fa',
  ...cardStyle,
};

const defaultProps = {
  header: '可配置项以及默认值',
  config: {},
  labelWidth: 80,
  description: null,
};

class PropertyBox extends Component {
  buildList = () => {
    const { config, ignorePropertyList } = this.props;

    const list = Object.entries(config).map((d) => {
      const [key, value] = d;

      if (!isUndefined(value)) {
        if (isBoolean(value) && value) {
          return {
            label: key,
            value: toString(value),
            ellipsis: false,
            canCopy: true,
          };
        } else if (isString(value)) {
          return {
            label: key,
            value: toString(value),
            ellipsis: false,
            canCopy: true,
          };
        } else if (isFunction(value)) {
          return {
            label: key,
            value: 'function',
            ellipsis: false,
            canCopy: true,
          };
        } else if (isObject(value) || isArray(value)) {
          if (checkInCollection(ignorePropertyList, key)) {
            return {
              label: key,
              value: 'data/component',
              ellipsis: false,
              canCopy: true,
            };
          }

          return {
            label: key,
            value: JSON.stringify(value),
            ellipsis: false,
            canCopy: true,
          };
        } else {
          return {
            label: key,
            value: toString(value),
            ellipsis: false,
            canCopy: true,
          };
        }
      }

      return {
        label: key,
        value: 'null',
        ellipsis: false,
        canCopy: true,
      };
    });

    return list;
  };

  render() {
    const { header, description, labelWidth } = this.props;

    return (
      <Card
        strip
        stripLeft={2}
        stripWidth={6}
        stripColor="#ccc"
        header={header || '示例'}
        style={style}
        headerStyle={cardHeaderStyle}
      >
        <Space direction="vertical" fillWidth>
          <DataGrid
            list={this.buildList()}
            border
            column={1}
            size="small"
            labelStyle={{ width: transformSize(labelWidth) }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />

          <HelpBox
            title="备注"
            showTitle
            showNumber={false}
            list={[
              {
                text: 'showRenderCount: 在控制台显示渲染次数,仅应当用于开发调试模式.',
              },
              {
                text: 'hidden: 通用属性, 用于在特定模式下隐藏控件(采用跳过不渲染模式达到隐藏效果).',
              },
              ...(isArray(description)
                ? description
                : isObject(description)
                  ? [description]
                  : []),
              ...(isString(description) &&
              !checkStringIsNullOrWhiteSpace(description)
                ? [
                    {
                      text: description,
                    },
                  ]
                : []),
            ]}
          />
        </Space>
      </Card>
    );
  }
}

PropertyBox.defaultProps = {
  ...defaultProps,
};

export { PropertyBox };
