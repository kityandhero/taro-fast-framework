import { View } from '@tarojs/components';

import {
  Card,
  Space,
  Loading,
  ActivityIndicator,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="Loading"
            style={style}
            border={false}
            headerStyle={cardHeaderStyle}
          >
            <Space size={24}>
              <Loading />

              <Loading type="comet" />
            </Space>
          </Card>

          <Card
            header="Loading Color"
            style={style}
            border={false}
            headerStyle={cardHeaderStyle}
          >
            <Space size={24}>
              <Loading color="#4589e1" />

              <Loading color="#4589e1" type="comet" />
            </Space>
          </Card>

          <Card
            header="Loading Size"
            style={style}
            border={false}
            headerStyle={cardHeaderStyle}
          >
            <Space size={24}>
              <Loading size={48} />

              <Loading size={48} type="comet" />
            </Space>
          </Card>

          <Card
            header="Loading BorderWidth"
            style={style}
            border={false}
            headerStyle={cardHeaderStyle}
          >
            <Space size={24}>
              <Loading borderWidth={4} />

              <Loading borderWidth={8} type="comet" />
            </Space>
          </Card>

          <Card
            header="ActivityIndicator"
            style={style}
            border={false}
            headerStyle={cardHeaderStyle}
          >
            <Space size={24}>
              <ActivityIndicator />
              <ActivityIndicator type="comet" />
              <ActivityIndicator content="loading" />
              <ActivityIndicator type="comet" content="loading" />
            </Space>
          </Card>

          <Card
            header="ActivityIndicator"
            style={style}
            border={false}
            headerStyle={cardHeaderStyle}
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
                <ActivityIndicator
                  mode="center"
                  type="comet"
                  content="loading"
                />
              </View>
            </Space>
          </Card>
        </Space>
      </View>
    );
  }
}
