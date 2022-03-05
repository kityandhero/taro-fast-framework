import { Component } from 'react';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import { isArray, isObject } from 'taro-fast-common/es/utils/typeCheck';
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
    const { config } = this.props;

    const list = Object.entries(config).map((d) => {
      const [key, value] = d;

      return {
        label: key,
        value:
          isObject(value) || isArray(value)
            ? JSON.stringify(value)
            : toString(value),
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
