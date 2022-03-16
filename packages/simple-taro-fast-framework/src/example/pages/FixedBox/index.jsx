import { View } from '@tarojs/components';
import { transformSize } from 'taro-fast-common/es/utils/tools';

import { FixedBox } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';

const style = {
  lineHeight: '1',
  padding: transformSize(10),
  backgroundColor: '#ccc',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Flex布局',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Flex',
    name: '固定容器',
    description: '固定容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showTransition: true,
      },
    };
  }

  doOtherWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ showTransition: false });
    }, 3000);
  };

  renderContent = () => {
    const { showTransition } = this.state;

    return (
      <View style={{ height: '1400px' }}>
        <FixedBox zIndex={1000} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox zIndex={1000} top={0} right={0} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox zIndex={1000} left={0} bottom={0} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox zIndex={1000} right={0} bottom={0} style={style}>
          FixedBox
        </FixedBox>

        {/* <FixedBox top="50%" left={100} style={style}>
          FixedBox
        </FixedBox> */}

        <FixedBox
          show={showTransition}
          width={200}
          height={40}
          zIndex={1000}
          center
          useTransition
          style={{
            ...style,
            ...{
              textAlign: 'center',
            },
          }}
        >
          FixedBox
        </FixedBox>

        {/* <FixedBox
          show={showTransition}
          top={200}
          right={40}
          height={60}
          useTransition
          style={style}
        >
          FixedTransitionBox
        </FixedBox> */}

        <PropertyBox config={FixedBox.defaultProps} labelWidth={270} />
      </View>
    );
  };
}
