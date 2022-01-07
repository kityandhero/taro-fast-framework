import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { recordObject } from 'taro-fast-common/es/utils/tools';
import {
  VerticalBox,
  Space,
  Spin,
  Empty,
  AutoCenter,
  BlockArea,
  Avatar,
  Badge,
  FadeView,
  NoticeBar,
  FlexBox,
  Row,
  Col,
  CenterBox,
  ImageBox,
  IconVolumePlus,
  Steps,
} from 'taro-fast-component/es/customComponents';
import { buildButton } from 'taro-fast-component/es/functionComponent';

import PageWrapper from '@/customComponents/PageWrapper';

import {
  getOverviewAction,
  getOverviewActionSheet,
  getOverviewActionModal,
} from '../Assist/action';

const { Step } = Steps;

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
  showRenderCountInConsole = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'news/getOverview',
      },
    };
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

  onActionClick = () => {
    getOverviewAction({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          recordObject(remoteData);
        }
      },
    });
  };

  onActionSheetClick = () => {
    getOverviewActionSheet({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          recordObject(remoteData);
        }
      },
    });
  };

  onActionModalClick = () => {
    getOverviewActionModal({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          recordObject(remoteData);
        }
      },
    });
  };

  showRemoteMetaDataInConsole = () => {
    recordObject(this.getRemoteMetaData());
  };

  renderFurther() {
    const { dataLoading, firstLoadSuccess } = this.state;

    console.log(this.state);

    const rowStyle = {
      backgroundColor: '#cdd1d5bf',
    };

    const colStyle = {
      textAlign: 'center',
      backgroundColor: '#0092ffbf',
    };

    return (
      <View className="index">
        <AutoCenter> Welcome To Taro-Fast-Framework! </AutoCenter>

        <BlockArea title="ImageBox">
          <FlexBox
            flexAuto="right"
            left={
              <View style={{ width: '100rpx' }}>
                <ImageBox src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45" />
              </View>
            }
            leftStyle={{ paddingRight: '10rpx' }}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            flexAuto="left"
            left="左侧"
            leftStyle={colStyle}
            right={
              <View style={{ width: '100rpx' }}>
                <ImageBox
                  circle
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45"
                />
              </View>
            }
            rightStyle={{ paddingLeft: '10rpx' }}
          />
        </BlockArea>

        <BlockArea title="Avatar">
          <Space wrap>
            <Avatar circle text="头像" />
            <Avatar text="头像" />
            <Avatar circle image="https://jdc.jd.com/img/200" />
            <Avatar image="https://jdc.jd.com/img/200" />
          </Space>
        </BlockArea>

        <BlockArea title="NoticeBar">
          <NoticeBar
            icon={<IconVolumePlus size={19} />}
            close
            marquee
            single
            showMore
            moreText="详情"
            afterClose={() => {
              console.log('afterClose');
            }}
            afterClickMore={() => {
              console.log('afterClickMore');
            }}
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="Badge Wrapper">
          <Space wrap style={{ '--gap': '24px' }}>
            <Badge content="5">
              <Avatar text="图" />
            </Badge>
            <Badge content="新">
              <Avatar text="图" />
            </Badge>
            <Badge content="更新啦">
              <Avatar text="图" />
            </Badge>

            <Badge
              color="#108ee9"
              content={Badge.dot}
              style={{ '--right': '100%', '--top': '100%' }}
            >
              <Avatar text="图" />
            </Badge>

            <Badge
              color="#87d068"
              content={Badge.dot}
              style={{ '--right': '100%' }}
            >
              <Avatar text="图" />
            </Badge>

            <Badge content={Badge.dot}>
              <Avatar text="图" />
            </Badge>

            <Badge
              color="orange"
              content={Badge.dot}
              style={{ '--top': '100%' }}
            >
              <Avatar text="图" />
            </Badge>
          </Space>
        </BlockArea>

        <BlockArea title="Badge Only">
          <Space style={{ '--gap': '24px' }}>
            <Badge content="99+" />

            <Badge content="新消息!" />
          </Space>
        </BlockArea>

        <BlockArea title="Flex">
          <View>
            <Row justify="center" style={rowStyle}>
              <Col size={1} style={colStyle}>
                1
              </Col>
              <Col size={1} style={colStyle}>
                1
              </Col>
            </Row>
          </View>
          <View>
            <Row style={rowStyle}>
              <Col size={4} style={colStyle}>
                4
              </Col>
              <Col size={4}>4</Col>
              <Col size={4} style={colStyle}>
                4
              </Col>
            </Row>
          </View>
          <View>
            <Row style={rowStyle}>
              <Col size={6} style={colStyle}>
                6
              </Col>
              <Col size={6}>6</Col>
            </Row>
          </View>
        </BlockArea>

        <BlockArea title="FlexBox">
          <FlexBox left="仅左侧" />

          <FlexBox
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            flexAuto="right"
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            style={{ height: '200rpx' }}
            direction="vertical"
            vertical={{
              bottomHeight: '80rpx',
            }}
            top="上侧"
            topStyle={rowStyle}
            bottom="下侧"
            bottomStyle={colStyle}
          />
        </BlockArea>

        <BlockArea title="CenterBox">
          <CenterBox>1</CenterBox>
        </BlockArea>

        <BlockArea title="BlockArea 横向">
          <Steps current={1}>
            <Step title="标题1" description="描述" />
            <Step title="标题2" description="描述" />
            <Step title="标题3" description="描述" />
          </Steps>
        </BlockArea>

        <BlockArea title="横向（失败状态）">
          <Steps current={2}>
            <Step title="第一步" />
            <Step title="第二步" />
            <Step title="第三步" status="error" />
          </Steps>
        </BlockArea>

        <BlockArea title="纵向">
          <Steps direction="vertical">
            <Step title="填写机构信息" status="process" />
            <Step title="签约机构" status="wait" />
            <Step title="关联服务区" status="wait" />
          </Steps>
        </BlockArea>

        <BlockArea title="纵向（失败状态）">
          <Steps direction="vertical">
            <Step
              title="填写机构信息"
              status="finish"
              description="完成时间：2020-12-01 12:30"
            />
            <Step
              title="签约机构"
              status="finish"
              description="完成时间：2020-12-01 12:30"
            />
            <Step
              title="关联服务区"
              status="finish"
              description="完成时间：2020-12-01 12:30"
            />
            <Step title="审批失败" status="error" />
          </Steps>
        </BlockArea>

        <BlockArea title="自定义图标和大小">
          <Steps
            direction="vertical"
            current={1}
            style={{
              '--title-font-size': '17px',
              '--description-font-size': '15px',
              '--indicator-margin-right': '12px',
              '--icon-size': '22px',
            }}
          >
            <Step
              title="填写机构信息"
              description="这里是一些描述"
              icon={<IconVolumePlus />}
            />
            <Step
              title="签约机构"
              description="这里是一些描述"
              icon={<IconVolumePlus />}
            />
            <Step
              title="关联服务区"
              description="这里是一些描述"
              icon={<IconVolumePlus />}
            />
          </Steps>
        </BlockArea>

        <BlockArea title="Buttons Color">
          <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
            <Space wrap>
              {buildButton({
                inner: 'default',
              })}

              {buildButton({
                inner: 'primary',
                color: 'primary',
              })}

              {buildButton({
                inner: 'success',
                color: 'success',
              })}

              {buildButton({
                inner: 'danger',
                color: 'danger',
              })}

              {buildButton({
                inner: 'warning',
                color: 'warning',
              })}

              {buildButton({
                inner: 'loading',
                loading: true,
              })}

              {buildButton({
                inner: 'disabled',
                disabled: true,
              })}
            </Space>
          </VerticalBox>
        </BlockArea>

        <BlockArea title="Buttons Block Large">
          <Space direction="vertical">
            {buildButton({
              inner: 'Block Button',
              block: true,
              color: 'primary',
              size: 'large',
            })}
          </Space>
        </BlockArea>

        <BlockArea title="Button Action">
          <Space wrap>
            {buildButton({
              inner: 'Action',
              color: 'primary',
              onClick: this.onActionClick,
            })}

            {buildButton({
              inner: 'ActionSheet',
              color: 'success',
              onClick: this.onActionSheetClick,
            })}

            {buildButton({
              inner: 'ActionModal',
              color: 'danger',
              onClick: this.onActionModalClick,
            })}

            {buildButton({
              inner: 'reload',
              loading: !!dataLoading,
              onClick: this.reloadData,
            })}

            {buildButton({
              inner: 'reloadRemoteMetaData',
              onClick: this.reloadRemoteMetaData,
            })}

            {buildButton({
              inner: 'showRemoteMetaDataInConsole',
              onClick: this.showRemoteMetaDataInConsole,
            })}
          </Space>
        </BlockArea>

        <BlockArea title="Empty">
          <Spin spin={!firstLoadSuccess}>
            <FadeView show={!dataLoading}>
              <VerticalBox style={{ height: '50rpx' }} alignJustify="center">
                <Space direction="vertical">
                  <VerticalBox
                    style={{ height: '100rpx' }}
                    alignJustify="center"
                  >
                    <Empty
                      description="暂无数据"
                      onImageClick={() => {
                        console.log('onImageClick');
                      }}
                      onDescriptionClick={() => {
                        console.log('onDescriptionClick');
                      }}
                    />
                  </VerticalBox>
                </Space>
              </VerticalBox>
            </FadeView>
          </Spin>
        </BlockArea>

        <BlockArea title="AutoCenter">
          <AutoCenter>
            Esse ad minim incididunt elit veniam elit deserunt. Enim nisi duis
            aliquip mollit adipisicing. Dolor excepteur ipsum in quis magna
            irure exercitation ad anim adipisicing irure commodo. Culpa
            adipisicing duis est irure occaecat officia reprehenderit nisi magna
            nulla enim nostrud. Nisi commodo excepteur do sint Lorem qui laboris
            incididunt id. Elit ex dolor minim ullamco ex mollit commodo laboris
            voluptate aute nostrud Lorem. Nulla et elit in anim incididunt id
            culpa Lorem. Dolore ullamco aliqua do reprehenderit consectetur
            proident occaecat laborum tempor proident ipsum labore quis culpa.
          </AutoCenter>
        </BlockArea>
      </View>
    );
  }
}
