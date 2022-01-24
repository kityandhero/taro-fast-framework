import { View } from '@tarojs/components';

import {
  Card,
  Button,
  Modal,
  CenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
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

  onClickShow3 = () => {
    this.setState({
      show3: true,
    });
  };

  onClickHide3 = () => {
    this.setState({
      show3: false,
    });
  };

  onClickShow4 = () => {
    this.setState({
      show4: true,
    });
  };

  onClickHide4 = () => {
    this.setState({
      show4: false,
    });
  };

  onClickShow5 = () => {
    this.setState({
      show5: true,
    });
  };

  onClickHide5 = () => {
    this.setState({
      show5: false,
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <Card header="展示容器" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <Button
              block
              size="large"
              onClick={() => {
                this.onClickShow1(1);
              }}
            >
              打开Modal
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                this.onClickShow2(2);
              }}
            >
              打开Modal (无标题)
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                this.onClickShow3(3);
              }}
            >
              打开Modal (仅显示确认按钮)
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                this.onClickShow4(4);
              }}
            >
              打开Modal (点击任意区域关闭)
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                this.onClickShow5(5);
              }}
            >
              打开Modal (自定义)
            </Button>
          </Space>
        </Card>

        <Modal
          visible={this.state.show1}
          header={<CenterBox>这里是标题</CenterBox>}
          onCancel={this.onClickHide1}
          onConfirm={this.onClickHide1}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show2}
          onCancel={this.onClickHide2}
          onConfirm={this.onClickHide2}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show3}
          header={<CenterBox>这里是标题</CenterBox>}
          showCancel={false}
          onConfirm={this.onClickHide3}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show4}
          header={<CenterBox>这里是标题</CenterBox>}
          hideFooter
          onClose={this.onClickHide4}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show5}
          header={<CenterBox>这里是标题</CenterBox>}
          footer={
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 'var(--tfc-14)',
                height: 'var(--tfc-60)',
                lineHeight: 'var(--tfc-60)',
                color: '#fff',
                textAlign: 'center',
                fontSize: 'var(--tfc-28)',
                margin: 'var(--tfc-14) var(--tfc-12)',
              }}
              onClick={this.onClickHide5}
            >
              立即处理
            </View>
          }
        >
          这里是内容区域
        </Modal>
      </View>
    );
  }
}
