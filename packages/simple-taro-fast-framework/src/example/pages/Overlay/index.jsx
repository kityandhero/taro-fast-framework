import { View } from '@tarojs/components';

import { List, Overlay } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

import './index.less';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show1: false,
        show2: false,
      },
    };
  }

  onClickShow1 = () => {
    this.setState({
      show1: true,
    });
  };

  onClickHide1 = () => {
    this.setState({
      show1: false,
    });
  };

  onClickShow2 = () => {
    this.setState({
      show2: true,
    });
  };

  onClickHide2 = () => {
    this.setState({
      show2: false,
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <List header="Overlay 遮罩层" style={style}>
          <List.Item arrow onClick={this.onClickShow1}>
            显示遮罩层
          </List.Item>
          <List.Item arrow onClick={this.onClickShow2}>
            嵌入内容
          </List.Item>
        </List>

        <Overlay show={this.state.show1} onClick={this.onClickHide1} />

        <Overlay show={this.state.show2} onClick={this.onClickHide2}>
          <View class="wrapper">
            <View class="block" />
          </View>
        </Overlay>
      </View>
    );
  }
}
