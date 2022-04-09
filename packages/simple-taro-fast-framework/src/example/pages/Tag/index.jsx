import { connect } from 'react-redux';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Space, Tag } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const colorList = ['default', 'primary', 'success', 'warning', 'danger'];

const config10 = {
  color: '#2db7f5',
};

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

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tag',
    name: '标签',
    description: '标签组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基本用法',
        currentConfig: {},
      },
    };
  }

  establishColorList = () => {
    return colorList.map((item) => {
      return {
        header: `内置颜色 - ${item}`,
        config: {
          color: item,
        },
      };
    });
  };

  establishControlList = () => {
    return [
      {
        header: '基本用法',
        config: {},
      },
      ...this.establishColorList(),
      {
        header: '自定义颜色',
        config: config10,
      },
      {
        header: '线框填充',
        config: config1,
      },
      {
        header: '圆角',
        config: config2,
      },
      {
        header: '半圆角左',
        config: config3,
      },
      {
        header: '半圆角右',
        config: config4,
      },
      {
        header: '隐藏',
        config: config5,
      },
      {
        header: '点击事件',
        config: config6,
      },
      {
        header: '可关闭',
        config: config7,
      },
      {
        header: '设置可关闭颜色',
        config: config8,
      },
      {
        header: 'CSS 变量',
        config: config9,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Tag key={key} {...config}>
        {this.buildSimpleItemInner(inner || '标签')}
      </Tag>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Tag"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Tag.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
