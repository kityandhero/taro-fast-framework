import { Component } from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { Card } from 'taro-fast-component';

import { cardHeaderStyle, cardStyle } from '../../customConfig';
import { buildComponentPrismCode } from '../../utils';

const style = {
  backgroundColor: '#f5f7fa',
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
          checkStringIsNullOrWhiteSpace(description || null)
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

export { CodeBox };
