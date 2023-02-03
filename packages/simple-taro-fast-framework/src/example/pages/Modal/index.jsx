import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { Button, Card, CenterBox, Modal, Space } from 'taro-fast-component';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { ContentPageBase } from '../../../customComponents';
import { cardHeaderStyle, cardStyle } from '../../../customConfig';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const buttonFillList = [
  {
    label: '默认',
    value: 'default',
  },
  {
    label: '按钮',
    value: 'button',
  },
];

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Modal',
    name: '弹窗',
  };

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
        show6: false,
        buttonFill: ['default'],
      },
    };
  }

  setButtonFill = (value) => {
    this.setState({
      buttonFill: value,
    });
  };

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

  onClickShow6 = () => {
    this.setState({
      show6: true,
    });
  };

  onClickHide6 = () => {
    this.setState({
      show6: false,
    });
  };

  renderContent = () => {
    const { buttonFill } = this.state;

    return (
      <>
        <Space direction="vertical" fillWidth>
          <Card header="展示容器" style={style} headerStyle={cardHeaderStyle}>
            <Space direction="vertical" fillWidth>
              <Button
                block
                size="large"
                onClick={() => {
                  this.onClickShow1(1);
                }}
              >
                打开Modal (默认按钮样式)
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

              <Button
                block
                size="large"
                onClick={() => {
                  this.onClickShow6(6);
                }}
              >
                多个按钮
              </Button>
            </Space>
          </Card>

          <Card
            header="选择按钮模式"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              options={buttonFillList}
              value={buttonFill}
              onChange={this.setButtonFill}
            />
          </Card>
        </Space>

        <Modal
          visible={this.state.show1}
          buttonFill={
            buttonFill.length > 0 ? buttonFill[0] === 'default' : true
          }
          header={<CenterBox>这里是标题</CenterBox>}
          onCancel={this.onClickHide1}
          onConfirm={this.onClickHide1}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show2}
          buttonFill={
            buttonFill.length > 0 ? buttonFill[0] === 'default' : true
          }
          onCancel={this.onClickHide2}
          onConfirm={this.onClickHide2}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show3}
          buttonFill={
            buttonFill.length > 0 ? buttonFill[0] === 'default' : true
          }
          header={<CenterBox>这里是标题</CenterBox>}
          showCancel={false}
          onConfirm={this.onClickHide3}
        >
          这里是内容区域
        </Modal>

        <Modal
          visible={this.state.show4}
          buttonFill={
            buttonFill.length > 0 ? buttonFill[0] === 'default' : true
          }
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

        <Modal
          visible={this.state.show6}
          header={<CenterBox>这里是标题</CenterBox>}
          hideFooter
        >
          这里是内容区域
          <CenterBox>
            <View
              style={{
                width: 'var(--tfc-380)',
              }}
            >
              <View
                style={{
                  backgroundColor: '#567432',
                  borderRadius: 'var(--tfc-14)',
                  height: 'var(--tfc-60)',
                  lineHeight: 'var(--tfc-60)',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 'var(--tfc-28)',
                  margin: 'var(--tfc-14) var(--tfc-12)',
                }}
              >
                按钮1
              </View>
              <View
                style={{
                  backgroundColor: '#128904',
                  borderRadius: 'var(--tfc-14)',
                  height: 'var(--tfc-60)',
                  lineHeight: 'var(--tfc-60)',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 'var(--tfc-28)',
                  margin: 'var(--tfc-14) var(--tfc-12)',
                }}
              >
                按钮2
              </View>
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
                onClick={this.onClickHide6}
              >
                关闭
              </View>
            </View>
          </CenterBox>
        </Modal>
      </>
    );
  };
}
