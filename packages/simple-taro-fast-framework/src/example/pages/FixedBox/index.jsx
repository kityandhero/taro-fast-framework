import { View } from '@tarojs/components';
import { transformSize } from 'taro-fast-common/es/utils/tools';

import { FixedBox } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  lineHeight: '1',
  padding: transformSize(10),
  backgroundColor: '#ccc',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Flex',
    name: '弹性布局',
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
        <FixedBox style={style}>FixedBox</FixedBox>

        <FixedBox top={0} right={0} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox left={0} bottom={0} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox right={0} bottom={0} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox top="50%" left={100} style={style}>
          FixedBox
        </FixedBox>

        <FixedBox
          width={200}
          height={40}
          center
          style={{
            ...style,
            ...{
              textAlign: 'center',
            },
          }}
        >
          FixedBox
        </FixedBox>

        <FixedBox
          show={showTransition}
          top={200}
          right={40}
          height={60}
          useTransition
          style={style}
        >
          FixedTransitionBox
        </FixedBox>
      </View>
    );
  };
}
