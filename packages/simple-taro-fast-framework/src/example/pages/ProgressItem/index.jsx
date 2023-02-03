import { connect } from 'easy-soft-dva';
import { showInfoMessage } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Button,
  CenterBox,
  HelpBox,
  Icon,
  ProgressItem,
  Space,
} from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const { IconCheckCircle } = Icon;

const config1 = {
  label: '当前进度',
  percent: 20,
  extra: '扩展',
};

const config2 = {
  layout: 'vertical',
  label: '当前进度',
  percent: 20,
  extra: '扩展',
};

const config3 = {
  label: '剩余数量',
  percent: 70,
  borderRadius: 4,
  showInfo: true,
  fontSize: 28,
  activeColor: '#FF3141',
  backgroundColor: '#000000',
  icon: <IconCheckCircle size={38} showInfo color="green" />,
  extra: (
    <Button
      color="primary"
      size="mini"
      onClick={() => {
        showInfoMessage({
          text: 'click',
        });
      }}
      style={{ marginLeft: transformSize(8) }}
    >
      立即抢
    </Button>
  ),
  extraStyle: {
    // padding: `0 ${transformSize(10)}`,
  },
};

const config4 = {
  ...config3,
  ...{
    layout: 'vertical',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '进度项',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ProgressItem',
    name: '进度项',
    description: '进度项组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        percent: 10,
        header: '横向布局',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '横向布局',
        config: config1,
      },
      {
        header: '纵向布局',
        config: config2,
      },
      {
        header: '横向布局示例',
        config: config3,
      },
      {
        header: '纵向布局示例',
        config: config4,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { percent } = this.state;

    return (
      <ProgressItem key={key} {...{ ...config, ...{ percent } }}>
        {this.buildSimpleItemInner(inner)}
      </ProgressItem>
    );
  };

  setPercent = (value) => {
    const { percent } = this.state;

    const v = percent + value;

    this.setState({
      percent: v >= 100 ? 100 : v,
    });
  };

  reSetPercent = () => {
    this.setState({
      percent: 10,
    });
  };

  renderContent = () => {
    const { header, description, currentConfig, inner, percent } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={{ ...currentConfig, ...{ percent } }}
          componentName="ProgressItem"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'extra']}
          controlBox={this.buildControlBox(this.establishControlList())}
          extraArea={
            <CenterBox>
              <Space>
                <Button
                  color="primary"
                  size="small"
                  disabled={percent === 100}
                  onClick={() => {
                    this.setPercent(10);
                  }}
                  style={{ marginRight: transformSize(8) }}
                >
                  进度+10
                </Button>

                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.reSetPercent();
                  }}
                >
                  重置进度
                </Button>
              </Space>
            </CenterBox>
          }
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={ProgressItem.defaultProps} labelWidth={310} />

        <SimpleBox header="属性说明 :">
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '默认为横向布局',
              },
              {
                text: '进度条配置请参照 ProgressBox组件',
              },
            ]}
          />
        </SimpleBox>
      </Space>
    );
  };
}
