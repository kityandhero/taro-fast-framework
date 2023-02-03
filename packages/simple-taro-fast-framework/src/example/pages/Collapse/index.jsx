import { connect } from 'easy-soft-dva';

import { Card, Collapse, Space } from 'taro-fast-component';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';
import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const list = [
  {
    label: '标题1',
    body: '面板1',
  },
  {
    label: '标题2',
    body: '面板2',
  },
  {
    label: '标题3',
    body: '面板3',
  },
];

const config1 = {
  list,
};

const config2 = {
  single: true,
  list: [
    {
      label: '标题1',
      body: '面板1',
    },
    {
      label: '标题2',
      body: '面板2',
    },
    {
      label: '标题3',
      body: '面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3',
    },
  ],
};

const config3 = {
  single: true,
  list: [
    {
      label: '标题1',
      body: '面板1',
    },
    {
      label: '标题2',
      body: '面板2',
    },
    {
      label: '标题3',
      disabled: true,
      body: '面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3',
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '折叠面板',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Collapse',
    name: '折叠面板',
    description: '折叠面板组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基本展示',
        currentConfig: config1,
        wrapBuilder: (o) => {
          return (
            <Card
              header="容器"
              style={style}
              headerStyle={cardHeaderStyle}
              space={false}
            >
              {o}
            </Card>
          );
        },
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基本展示',
        config: config1,
        wrapBuilder: (o) => {
          return (
            <Card
              header="容器"
              style={style}
              headerStyle={cardHeaderStyle}
              space={false}
            >
              {o}
            </Card>
          );
        },
      },
      {
        header: '唯一展开',
        config: config2,
        wrapBuilder: (o) => {
          return (
            <Card
              header="容器"
              style={style}
              headerStyle={cardHeaderStyle}
              space={false}
            >
              {o}
            </Card>
          );
        },
      },
      {
        header: '禁用',
        config: config3,
        wrapBuilder: (o) => {
          return (
            <Card
              header="容器"
              style={style}
              headerStyle={cardHeaderStyle}
              space={false}
            >
              {o}
            </Card>
          );
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Collapse key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Collapse>
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
          componentName="Collapse"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Collapse.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
