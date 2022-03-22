import {
  showInfoMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  Space,
  ProgressItem,
  Button,
  Icon,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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
          message: 'click',
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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ProgressItem',
    name: '进度项',
    description: '进度项组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="横向布局"
          config={config1}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox
        >
          <Space direction="vertical" fillWidth>
            <ProgressItem {...config1} />
          </Space>
        </SimpleBox>

        <SimpleBox
          header="纵向布局"
          config={config2}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox
        >
          <Space direction="vertical" fillWidth>
            <ProgressItem {...config2} />
          </Space>
        </SimpleBox>

        <SimpleBox
          header="横向布局示例"
          config={config3}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon', 'extra']}
        >
          <ProgressItem {...config3} />
        </SimpleBox>

        <SimpleBox
          header="纵向布局示例"
          config={config4}
          componentName="ProgressBox"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon', 'extra']}
        >
          <ProgressItem {...config4} />
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
