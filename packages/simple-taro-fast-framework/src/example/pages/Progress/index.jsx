import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Space,
  Progress,
  Button,
  HelpBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config0 = {};

const config1 = {
  hidden: true,
};

const config2 = {
  strokeWidth: 4,
  fontSize: 20,
  percent: 50,
};

const config3 = {
  percent: 70,
  animation: true,
};

const config4 = {
  percent: 70,
  borderRadius: 12,
  activeColor: '#FF3141',
  backgroundColor: '#000000',
};

const config5 = {
  percent: 70,
  animation: true,
  activeColor: ['#FF0000', '#FFF200', '#1E9600'],
};

const config6 = {
  percent: 70,
  useBorderRadius: false,
};

const config7 = {
  percent: 70,
  showInfo: true,
};

const config8 = {
  percent: 50,
  showInfo: true,
  fontSize: 20,
};

const config9 = {
  percent: 70,
  borderRadius: 12,
  showInfo: true,
  animation: true,
  strokeWidth: 16,
  fontSize: 36,
  activeColor: '#FF3141',
  backgroundColor: '#000000',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '价格',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Progress',
    name: '进度条',
    description: '进度条组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        percent: 10,
        header: '基础使用',
        currentConfig: config0,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础使用',
        config: config0,
      },
      {
        header: '隐藏模式',
        config: config1,
      },
      {
        header: '指定线条宽度',
        config: config2,
      },
      {
        header: '展示动画',
        config: config3,
      },
      {
        header: '指定颜色',
        config: config4,
      },
      {
        header: '渐变色',
        config: config5,
      },
      {
        header: '直角模式',
        config: config6,
      },
      {
        header: '显示百分比',
        config: config7,
      },
      {
        header: '百分比字体大小',
        config: config8,
      },
      {
        header: '复杂配置',
        config: config9,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { percent } = this.state;

    return (
      <Progress key={key} {...{ ...config, ...{ percent } }}>
        {this.buildSimpleItemInner(inner)}
      </Progress>
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
          componentName="Progress"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
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

        <PropertyBox config={Progress.defaultProps} labelWidth={240} />

        <SimpleBox header="属性说明 :">
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: 'percent: 进度百分比, 取值范围[0 ~ 100].',
              },
              {
                text: 'showInfo: 是否显示百分比.',
              },
              {
                text: 'animation: 是被显示动画.',
              },
              {
                text: 'borderRadius: 圆角设置值.',
              },
              {
                text: 'strokeWidth: 进度条宽度.',
              },
              {
                text: 'fontSize: 字体大小.',
              },
              {
                text: 'activeColor: 进度条颜色,string 或者[string,string,...], 数组模式将使用渐变色.',
              },
              {
                text: 'backgroundColor: 进度条背景色.',
              },
            ]}
          />
        </SimpleBox>
      </Space>
    );
  };
}
