import { View } from '@tarojs/components';

import {
  Card,
  Space,
  Loading,
  ActivityIndicator,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Loading',
    name: '加载提示',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="普通模式"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '用法: <Loading />',
                },
                {
                  text: '用法: <Loading type="comet" />',
                },
              ]}
            />
          }
        >
          <Space size={24}>
            <Loading />

            <Loading type="comet" />
          </Space>
        </Card>

        <Card
          header="设置颜色"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '用法: <Loading color="#4589e1" />',
                },
              ]}
            />
          }
        >
          <Space size={24}>
            <Loading color="#4589e1" />

            <Loading color="#4589e1" type="comet" />
          </Space>
        </Card>

        <Card
          header="设置大小"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '用法: <Loading size={48} />',
                },
              ]}
            />
          }
        >
          <Space size={24}>
            <Loading size={48} />

            <Loading size={48} type="comet" />
          </Space>
        </Card>

        <Card
          header="设置线条宽度"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '用法: <Loading borderWidth={4} />',
                },
              ]}
            />
          }
        >
          <Space size={24}>
            <Loading borderWidth={4} />

            <Loading borderWidth={8} type="comet" />
          </Space>
        </Card>

        <Card
          header="附带文字的加载提示"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '用法: <ActivityIndicator type="comet" content="loading" />',
                },
              ]}
            />
          }
        >
          <Space size={24}>
            <ActivityIndicator />
            <ActivityIndicator type="comet" />
            <ActivityIndicator content="loading" />
            <ActivityIndicator type="comet" content="loading" />
          </Space>
        </Card>

        <Card
          header="居中显示的加载提示"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '用法: <ActivityIndicator mode="center" type="comet" content="loading" />',
                },
                {
                  text: '说明: 需要父容器设置相对定位',
                },
              ]}
            />
          }
        >
          <Space direction="vertical" fillWidth>
            <View
              style={{
                border: 'var(--tfc-1) solid #ccc',
                height: '200rpx',
                position: 'relative',
              }}
            >
              <ActivityIndicator mode="center" content="loading" />
            </View>

            <View
              style={{
                border: 'var(--tfc-1) solid #ccc',
                height: '200rpx',
                position: 'relative',
              }}
            >
              <ActivityIndicator mode="center" type="comet" content="loading" />
            </View>
          </Space>
        </Card>
      </Space>
    );
  };
}
