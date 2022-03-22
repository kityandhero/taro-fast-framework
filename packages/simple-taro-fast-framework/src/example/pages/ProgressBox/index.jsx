import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Space,
  ProgressBox,
  Button,
  Icon,
  HelpBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconCheckCircle } = Icon;

const config1 = {
  icon: <IconCheckCircle size={38} color="green" />,
};

const config2 = {
  hidden: true,
};

const config3 = {
  percent: 70,
  borderRadius: 4,
  showInfo: true,
  animation: true,
  fontSize: 28,
  activeColor: '#FF3141',
  backgroundColor: '#000000',
  icon: <IconCheckCircle size={38} showInfo color="green" />,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '扩展进度条',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ProgressBox',
    name: '扩展进度条',
    description: '扩展进度条组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        percent: 10,
      },
    };
  }

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
    const { percent } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="附带图标"
          config={{ ...config1, ...{ percent } }}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['icon']}
        >
          <Space direction="vertical" fillWidth>
            <ProgressBox {...config1} percent={percent} />

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
          </Space>
        </SimpleBox>

        <SimpleBox
          header="隐藏模式"
          config={{ ...config2, ...{ percent } }}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox
        >
          <Space direction="vertical" fillWidth>
            <ProgressBox {...config2} percent={percent} />
          </Space>
        </SimpleBox>

        <SimpleBox
          header="复杂配置"
          config={config3}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <ProgressBox {...config3} />
        </SimpleBox>

        <PropertyBox config={ProgressBox.defaultProps} labelWidth={310} />

        <SimpleBox header="属性说明 :">
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '进度条配置请参照 Progress组件',
              },
            ]}
          />
        </SimpleBox>
      </Space>
    );
  };
}
