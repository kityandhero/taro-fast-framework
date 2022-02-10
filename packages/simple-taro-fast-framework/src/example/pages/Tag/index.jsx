import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, Space, Tag } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tag',
    name: '标签',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="基本用法" style={style} headerStyle={cardHeaderStyle}>
          <Tag>123</Tag>
        </Card>

        <Card
          header="默认提供 5 种通用标签颜色"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Space>
            <Tag color="default">Default</Tag>
            <Tag color="primary">测试</Tag>
            <Tag color="success">Success</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="danger">Danger</Tag>
          </Space>
        </Card>

        <Card header="自定义颜色" style={style} headerStyle={cardHeaderStyle}>
          <Space>
            <Tag color="#2db7f5">#2db7f5</Tag>
            <Tag color="#87d068">#87d068</Tag>
            <Tag color="#108ee9">#108ee9</Tag>
          </Space>
        </Card>
        <Card header="线框填充" style={style} headerStyle={cardHeaderStyle}>
          <Space>
            <Tag color="primary" fill="outline">
              Primary
            </Tag>
            <Tag color="#87d068" fill="outline">
              #87d068
            </Tag>
            <Tag color="#ff6430" fill="outline">
              #ff6430
            </Tag>
          </Space>
        </Card>

        <Card header="圆角" style={style} headerStyle={cardHeaderStyle}>
          <Tag shape="circle" color="#2db7f5">
            circle
          </Tag>
        </Card>

        <Card header="半圆角" style={style} headerStyle={cardHeaderStyle}>
          <Space>
            <Tag shape="circleLeft" color="#2db7f5">
              circle left
            </Tag>

            <Tag shape="circleRight" color="#2db7f5">
              circle right
            </Tag>
          </Space>
        </Card>

        <Card header="hidden" style={style} headerStyle={cardHeaderStyle}>
          <Tag hidden>hidden</Tag>
        </Card>

        <Card header="onClick" style={style} headerStyle={cardHeaderStyle}>
          <Space>
            <Tag
              color="default"
              onClick={() => {
                this.bannerNotify({
                  message: 'tag click',
                });
              }}
            >
              click
            </Tag>
          </Space>
        </Card>

        <Card header="可以关闭" style={style} headerStyle={cardHeaderStyle}>
          <Space>
            <Tag
              color="default"
              closeable
              onClick={() => {
                this.bannerNotify({
                  message: 'tag click',
                });
              }}
              onClose={() => {
                this.bannerNotify({
                  message: 'tag close',
                });
              }}
            >
              click
            </Tag>

            <Tag
              color="default"
              closeable
              closeColor="#28e745"
              onClick={() => {
                this.bannerNotify({
                  message: 'tag click',
                });
              }}
              onClose={() => {
                this.bannerNotify({
                  message: 'tag close',
                });
              }}
            >
              click
            </Tag>
          </Space>
        </Card>

        <Card
          header="通过 CSS 变量进行个性化"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Space>
            <Tag
              color="primary"
              fill="outline"
              style={{ '--border-radius': transformSize(6) }}
            >
              Primary
            </Tag>
            <Tag
              color="success"
              fill="outline"
              style={{ '--background-color': '#c8f7c5' }}
            >
              Success
            </Tag>
            <Tag
              color="warning"
              style={{ '--text-color': 'var(--adm-color-text)' }}
            >
              Warning
            </Tag>
            <Tag
              color="danger"
              fill="outline"
              style={{ '--border-color': 'var(--adm-color-weak)' }}
            >
              Danger
            </Tag>
          </Space>
        </Card>
      </Space>
    );
  };
}
