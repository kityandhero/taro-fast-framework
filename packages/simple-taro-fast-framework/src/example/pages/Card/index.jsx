import {
  Card,
  Item,
  ColorText,
  Icon,
  Button,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconEdit } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const config1 = {
  header: '默认布局',
  style,
  headerStyle: cardHeaderStyle,
  footer: '这里是底部内容',
};

const config2 = {
  header: '通栏视图',
  style,
  headerStyle: cardHeaderStyle,
  space: false,
};

const config3 = {
  header: '扩展',
  style,
  headerStyle: cardHeaderStyle,
  space: false,
  extra: <Button size="mini">扩展</Button>,
};

const config4 = {
  header: 'strip',
  style,
  headerStyle: cardHeaderStyle,
  space: false,
  strip: true,
  stripColor: 'blue',
};

const config5 = {
  header: '卡片模式',
  style: {
    ...style,
    ...{
      borderBottom: 'var(--tfc-1) solid var(--tfc-border-color)',
    },
  },
  headerStyle: cardHeaderStyle,
  mode: 'card',
  space: false,
};

const config6 = {
  header: (
    <ColorText icon={<IconEdit size={32} color="#ff3ce7" />} text="附带图标" />
  ),
  style,
  headerStyle: cardHeaderStyle,
  space: false,
  extra: <Button size="mini">扩展</Button>,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '卡片',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Card',
    name: '卡片',
    description: '卡片组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认布局',
        currentConfig: config1,
        inner:
          '这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域',
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认布局',
        config: config1,
        inner:
          '这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域',
      },
      {
        header: '通栏视图',
        config: config2,
        inner: [
          <Item key="item-1" label="1" />,
          <Item key="item-2" label="2" />,
          <Item key="item-3" label="3" border={false} />,
        ],
      },
      {
        header: 'Header扩展',
        config: config3,
        inner: [
          <Item key="item-1" label="条目1" arrow />,
          <Item key="item-2" label="条目2" arrow />,
          <Item key="item-3" label="条目3" arrow border={false} />,
        ],
      },
      {
        header: 'Header strip',
        config: config4,
        inner: [
          <Item key="item-1" label="条目1" arrow />,
          <Item key="item-2" label="条目2" arrow />,
          <Item key="item-3" label="条目3" arrow border={false} />,
        ],
      },
      {
        header: '卡片模式',
        config: config5,
        inner: [
          <Item key="item-1" title="这里是标题" label="这里是主信息" />,
          <Item key="item-2" title="这里是标题" label="这里是主信息" />,
          <Item
            key="item-3"
            title="这里是标题"
            label="这里是主信息"
            border={false}
          />,
        ],
      },
      {
        header: '附带图标',
        config: config6,
        inner: [
          <Item key="item-1" label="条目1" arrow />,
          <Item key="item-2" label="条目2" arrow />,
          <Item key="item-3" label="条目3" arrow border={false} />,
        ],
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Card key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Card>
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
          componentName="Card"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['extra', 'header']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Card.defaultProps} labelWidth={310} />
      </Space>
    );
  };
}
