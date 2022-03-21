import { Component } from 'react';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import {
  isArray,
  isObject,
  isFunction,
  isUndefined,
  isBoolean,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import { Card, DataGrid } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
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
          if (inCollection(ignorePropertyList, key)) {
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
        footer={
          stringIsNullOrWhiteSpace(description || null)
            ? null
            : `备注: ${description}.`
        }
      >
        <DataGrid
          list={this.buildList()}
          border
          column={1}
          size="small"
          labelStyle={{ width: transformSize(labelWidth) }}
          emptyValue="暂无"
          emptyStyle={{ color: '#ccc' }}
        />
      </Card>
    );
  }
}

PropertyBox.defaultProps = {
  ...defaultProps,
};

export default PropertyBox;
