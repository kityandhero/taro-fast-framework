import { View } from '@tarojs/components';

import {
  Card,
  FlexBox,
  ImageBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import { colStyle } from '@/customConfig/constants';
import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    const imageBoxContainerStyle = {
      display: 'block',
      width: 'var(--tfc-px-100)',
    };
    const imageContainerStyle = { padding: '2px', backgroundColor: 'red' };

    const src =
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45';

    return (
      <View className="index">
        <Card header="普通使用" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox src={src} />
            </View>
          </Space>
        </Card>

        <Card header="指定容器样式" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox imageBoxStyle={imageContainerStyle} src={src} />
            </View>
          </Space>
        </Card>

        <Card header="showMode:loading" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox showMode="loading" src={src} />
            </View>
          </Space>
        </Card>

        <Card header="showOverlay:true" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox showOverlay overlayText="售罄" src={src} />
            </View>
          </Space>
        </Card>

        <Card header="decoration" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox
                decoration={{
                  text: '1',
                }}
                src={src}
              />
            </View>
          </Space>
        </Card>

        <Card
          header="imageMode [取值等同于微信Image]"
          headerStyle={cardHeaderStyle}
        >
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="scaleToFill" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="aspectFit" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="aspectFill" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="widthFix" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="heightFix" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="top" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="bottom" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="center" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="left" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="right" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="top left" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="top right" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="bottom left" src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox imageMode="bottom right" src={src} />
            </View>
          </Space>
        </Card>

        <Card header="圆形轮廓" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox circle src={src} />
            </View>
          </Space>
        </Card>

        <Card header="LazyLoad" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox lazyLoad src={src} />
            </View>
          </Space>
        </Card>

        <Card header="指定长宽比" headerStyle={cardHeaderStyle}>
          <Space wrap>
            <View style={imageBoxContainerStyle}>
              <ImageBox aspectRatio={0.5} src={src} />
            </View>

            <View style={imageBoxContainerStyle}>
              <ImageBox circle aspectRatio={0.5} src={src} />
            </View>
          </Space>
        </Card>

        <Card header="简单布局" headerStyle={cardHeaderStyle}>
          <FlexBox
            flexAuto="right"
            left={
              <View style={{ width: 'var(--tfc-px-100)' }}>
                <ImageBox src={src} />
              </View>
            }
            leftStyle={{ paddingRight: 'var(--tfc-px-10)' }}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            flexAuto="left"
            left="左侧"
            leftStyle={colStyle}
            right={
              <View style={{ width: 'var(--tfc-px-100)' }}>
                <ImageBox
                  circle
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45"
                />
              </View>
            }
            rightStyle={{ paddingLeft: 'var(--tfc-px-10)' }}
          />
        </Card>
      </View>
    );
  }
}
