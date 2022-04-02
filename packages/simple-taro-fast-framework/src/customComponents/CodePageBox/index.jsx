import { Component } from 'react';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { Space, Card, DataGrid } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../customConfig/constants';
import { buildPagePrismCode } from '../../utils/tools';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const defaultProps = {
  header: '配置示例 点击复制',
  list: [],
  config: {},
  renderCodeList: [],
  usageList: [],
  description: null,
  ignorePropertyList: [],
};

class CodePageBox extends Component {
  render() {
    const {
      header,
      description,
      list,
      config,
      renderCodeList,
      usageList,
      ignorePropertyList,
      children,
    } = this.props;

    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="样式展示"
          style={style}
          headerStyle={cardHeaderStyle}
          strip
          stripLeft={2}
          stripWidth={6}
          stripColor="#3378f4"
        >
          {children}
        </Card>

        <Card
          header="配置说明"
          style={style}
          headerStyle={cardHeaderStyle}
          strip
          stripLeft={2}
          stripWidth={6}
          stripColor="#ccc"
        >
          <DataGrid
            list={list}
            border
            layout="row"
            size="small"
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card
          header="使用说明"
          style={style}
          headerStyle={cardHeaderStyle}
          strip
          stripLeft={2}
          stripWidth={6}
          stripColor="#ccc"
        >
          <DataGrid
            list={usageList}
            border
            layout="row"
            size="small"
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

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
          {buildPagePrismCode({
            renderCodeList: renderCodeList,
            config,
            ignorePropertyList,
            showDivider: false,
          })}
        </Card>
      </Space>
    );
  }
}

CodePageBox.defaultProps = {
  ...defaultProps,
};

export default CodePageBox;
