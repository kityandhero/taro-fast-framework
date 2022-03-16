import { Component } from 'react';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import {
  isArray,
  isFunction,
  isObject,
} from 'taro-fast-common/es/utils/typeCheck';
import {
  Card,
  ColorText,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';

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

  render() {
    const { space, prefix, header, description, helpTitle, children } =
      this.props;

    const list = this.buildList();

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
        footer={
          stringIsNullOrWhiteSpace(description || null)
            ? null
            : `备注: ${description}.`
        }
        space={space}
      >
        {children}

        {list.length > 0 ? (
          <HelpBox
            title={helpTitle}
            showTitle
            showDivider
            showNumber={false}
            list={this.buildList()}
          />
        ) : null}
      </Card>
    );
  }
}

SimpleBox.defaultProps = {
  ...defaultProps,
};

export default SimpleBox;
