import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  NoticeBar,
  Icon,
  Space,
  More,
} from 'taro-fast-component/es/customComponents';
import {} from 'taro-fast-component-extra/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconVolumePlus } = Icon;

const notice =
  '这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏';

const config1 = {
  icon: <IconVolumePlus size={38} />,
};

const config2 = {
  single: true,
  closeable: true,
};

const config3 = {
  marquee: true,
};

const config4 = {
  single: true,
  extra: (
    <View
      style={{
        width: transformSize(100),
        height: '100%',
        color: '#000',
        padding: `0 ${transformSize(10)}`,
        fontSize: transformSize(28),
        textAlign: 'center',
      }}
    >
      extra
    </View>
  ),
};

const config5 = {
  single: true,
  extra: <More />,
};

const config6 = {
  single: true,
  extra: (
    <More
      text="查看更多"
      onClick={() => {
        console.log('click more');
      }}
    />
  ),
};

const config7 = {
  icon: <IconVolumePlus size={38} />,
  marquee: true,
  single: true,
  extra: <More />,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '通知条',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'NoticeBar',
    name: '通知条',
    description: '通知条组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '附带图标',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        span: 2,
        header: '附带图标',
        config: config1,
      },
      {
        span: 2,
        header: '可关闭 [single 模式非 marquee 下生效]',
        config: config2,
      },
      {
        span: 2,
        header: 'marquee模式 [将自动启用 single 模式]',
        config: config3,
      },
      {
        span: 2,
        header: '自定义扩展 [single 模式下生效]',
        config: config4,
      },
      {
        span: 2,
        header: '显示更多 [single 模式下生效]',
        config: config5,
      },
      {
        span: 2,
        header: '自定义”更多“文字 [single 模式下生效]',
        config: config6,
      },
      {
        span: 2,
        header: '复杂例子',
        config: config7,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <NoticeBar key={key} {...config}>
        {this.buildSimpleItemInner(inner || notice)}
      </NoticeBar>
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
          componentName="NoticeBar"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={NoticeBar.defaultProps} labelWidth={160} />
      </Space>
    );
  };
}
