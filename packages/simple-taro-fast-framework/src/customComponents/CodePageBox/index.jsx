import { Component } from 'react';

import { checkStringIsNullOrWhiteSpace, isArray } from 'easy-soft-utility';

import { Card, DataGrid, Space } from 'taro-fast-component';

import { cardHeaderStyle, cardStyle } from '../../customConfig';
import { buildPagePrismCode } from '../../utils';

const style = {
  backgroundColor: '#f5f7fa',
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
        {children ? (
          <Card
            header="样式展示"
            style={style}
            headerStyle={cardHeaderStyle}
            strip
            stripLeft={2}
            stripWidth={6}
            stripColor="#3378f4"
          >
            ``
            {children}
          </Card>
        ) : null}

        {isArray(list) && list.length > 0 ? (
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
        ) : null}

        {isArray(usageList) && usageList.length > 0 ? (
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
        ) : null}

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

export { CodePageBox };
