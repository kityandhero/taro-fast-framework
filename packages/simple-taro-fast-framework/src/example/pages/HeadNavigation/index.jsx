import {
  buildLinearGradient,
  getMenuButtonBoundingClientRect,
} from 'taro-fast-common/es/utils/tools';
import {
  Line,
  Space,
  HeadNavigation,
  ImageBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '头部导航',
  navigationStyle: 'custom',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HelpBox',
    name: '帮助提示',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '一般用法',
        currentConfig: config1,
      },
    };
  }

  doWorkAdjustDidMount = () => {
    setTimeout(() => {
      const c = getMenuButtonBoundingClientRect();

      console.log(c);
    }, 1200);
  };

  establishControlList = () => {
    return [
      {
        header: '一般用法',
        config: config1,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Line key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Line>
    );
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigation
        backboardStyle={{
          width: '100%',
          height: '100%',
          backgroundImage: buildLinearGradient({
            direct: 45,
            list: ['#ff9700', '#ed1c24'],
          }),
        }}
        backboardChildren={<ImageBox />}
      >
        1
      </HeadNavigation>
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
          componentName="Line"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Line.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
