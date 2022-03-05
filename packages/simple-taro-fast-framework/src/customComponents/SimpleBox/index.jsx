import { Component } from 'react';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import { isArray, isObject } from 'taro-fast-common/es/utils/typeCheck';
import { Card, HelpBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const defaultProps = {
  header: '示例',
  helpTitle: '示例配置',
  config: {},
  description: null,
};

class SimpleBox extends Component {
  buildList = () => {
    const { config } = this.props;

    const list = Object.entries(config).map((d) => {
      const [key, value] = d;

      return {
        text: `${key}: ${
          isObject(value) || isArray(value)
            ? JSON.stringify(value)
            : toString(value)
        }`,
      };
    });

    return list;
  };

  render() {
    const { header, description, helpTitle, children } = this.props;

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
        {children}

        <HelpBox
          title={helpTitle}
          showTitle
          showNumber={false}
          list={this.buildList()}
        />
      </Card>
    );
  }
}

SimpleBox.defaultProps = {
  ...defaultProps,
};

export default SimpleBox;
