import { Component } from 'react';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { Card } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';
import { buildComponentPrismCode } from '../../utils/tools';

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
  render() {
    const {
      header,
      description,
      componentName,
      config,
      mockChildren,
      ignorePropertyList,
    } = this.props;

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
        {buildComponentPrismCode({
          componentName,
          config,
          mockChildren,
          ignorePropertyList,
          showDivider: false,
        })}
      </Card>
    );
  }
}

CodeBox.defaultProps = {
  ...defaultProps,
};

export default CodeBox;
