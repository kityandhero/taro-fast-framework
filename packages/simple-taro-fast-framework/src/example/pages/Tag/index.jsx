import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Space, Tag } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const colorList = ['default', 'primary', 'success', 'warning', 'danger'];

const config1 = {
  color: 'primary',
  fill: 'outline',
};

const config2 = {
  shape: 'circle',
  color: '#2db7f5',
};

const config3 = {
  shape: 'circleLeft',
  color: '#2db7f5',
};

const config4 = {
  shape: 'circleRight',
  color: '#2db7f5',
};

const config5 = {
  hidden: true,
};

const config6 = {
  color: 'default',
  onClick: () => {
    console.log({
      message: 'tag click',
    });
  },
};

const config7 = {
  color: 'default',
  closeable: true,
  onClick: () => {
    console.log({
      message: 'tag click',
    });
  },
  onClose: () => {
    console.log({
      message: 'tag close',
    });
  },
};

const config8 = {
  color: 'default',
  closeable: true,
  closeColor: '#28e745',
  onClick: () => {
    console.log({
      message: 'tag click',
    });
  },
  onClose: () => {
    console.log({
      message: 'tag close',
    });
  },
};

const config9 = {
  color: 'primary',
  fill: 'outline',
  style: {
    '--background-color': '#c8f7c5',
    '--border-radius': transformSize(6),
    '--text-color': 'var(--tfc-color-black)',
    '--border-color': 'var(--tfc-color-weak)',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '标签',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tag',
    name: '标签',
    description: '标签组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="基本用法">
          <Tag>123</Tag>
        </SimpleBox>

        <SimpleBox header="内置颜色">
          <Space>
            {colorList.map((o, i) => {
              return (
                <Tag key={`${i}`} color={o}>
                  {o}
                </Tag>
              );
            })}
          </Space>
        </SimpleBox>

        <SimpleBox header="自定义颜色">
          <Space>
            <Tag color="#2db7f5">#2db7f5</Tag>
            <Tag color="#87d068">#87d068</Tag>
            <Tag color="#108ee9">#108ee9</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="线框填充" config={config1}>
          <Space>
            {colorList.map((o, i) => {
              return (
                <Tag key={`${i}`} color={o} {...config1}>
                  {o}
                </Tag>
              );
            })}
          </Space>
        </SimpleBox>

        <SimpleBox header="圆角" config={config2}>
          <Space>
            <Tag {...config2}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="半圆角左" config={config3}>
          <Space>
            <Tag {...config3}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="半圆角右" config={config4}>
          <Space>
            <Tag {...config4}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="隐藏" config={config5}>
          <Space>
            <Tag {...config5}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="onClick [查看控制台]" config={config6}>
          <Space>
            <Tag {...config6}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="可关闭" config={config7}>
          <Space>
            <Tag {...config7}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="设置可关闭颜色" config={config8}>
          <Space>
            <Tag {...config8}>标签</Tag>
          </Space>
        </SimpleBox>

        <SimpleBox header="通过 CSS 变量进行个性化" config={config9}>
          <Space>
            <Tag {...config9}>标签</Tag>
          </Space>
        </SimpleBox>

        <PropertyBox config={Tag.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
