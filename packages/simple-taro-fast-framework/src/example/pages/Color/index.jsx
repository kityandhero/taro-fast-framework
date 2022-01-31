import { View } from '@tarojs/components';

import { Card, Space, Button } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="颜色" headerStyle={cardHeaderStyle}>
            <Space wrap>
              <Button backgroundColor="var(--tfc-color-red)">red</Button>
              <Button backgroundColor="var(--tfc-color-orange)">orange</Button>
              <Button backgroundColor="var(--tfc-color-yellow)">yellow</Button>
              <Button backgroundColor="var(--tfc-color-olive)">olive</Button>
              <Button backgroundColor="var(--tfc-color-green)">green</Button>
              <Button backgroundColor="var(--tfc-color-cyan)">cyan</Button>
              <Button backgroundColor="var(--tfc-color-blue)">blue</Button>
              <Button backgroundColor="var(--tfc-color-purple)">purple</Button>
              <Button backgroundColor="var(--tfc-color-pink)">pink</Button>
              <Button backgroundColor="var(--tfc-color-brown)">brown</Button>
              <Button backgroundColor="var(--tfc-color-grey)">grey</Button>
              <Button backgroundColor="var(--tfc-color-black)">black</Button>
            </Space>
          </Card>

          <Card header="浅色" headerStyle={cardHeaderStyle}>
            <Space wrap>
              <Button backgroundColor="var(--tfc-color-red-light)">
                red-light
              </Button>
              <Button backgroundColor="var(--tfc-color-orange-light)">
                orange-light
              </Button>
              <Button backgroundColor="var(--tfc-color-yellow-light)">
                yellow-light
              </Button>
              <Button backgroundColor="var(--tfc-color-olive-light)">
                olive-light
              </Button>
              <Button backgroundColor="var(--tfc-color-green-light)">
                green-light
              </Button>
              <Button backgroundColor="var(--tfc-color-cyan-light)">
                cyan-light
              </Button>
              <Button backgroundColor="var(--tfc-color-blue-light)">
                blue-light
              </Button>
              <Button backgroundColor="var(--tfc-color-purple-light)">
                purple-light
              </Button>
              <Button backgroundColor="var(--tfc-color-pink-light)">
                pink-light
              </Button>
              <Button backgroundColor="var(--tfc-color-brown-light)">
                brown-light
              </Button>
              <Button backgroundColor="var(--tfc-color-grey-light)">
                grey-light
              </Button>
              <Button backgroundColor="var(--tfc-color-black-light)">
                black-light
              </Button>
            </Space>
          </Card>

          <Card header="渐变色" headerStyle={cardHeaderStyle}>
            <Space wrap>
              <Button backgroundColor={['#f43f3b', ' #ec008c']}>
                gradual-red
              </Button>
              <Button backgroundColor={['#ff9700', ' #ed1c24']}>
                gradual-orange
              </Button>
              <Button backgroundColor={['#39b54a', ' #8dc63f']}>
                yellow-green
              </Button>
              <Button backgroundColor={['#9000ff', ' #5e00ff']}>
                olive-purple
              </Button>
              <Button backgroundColor={['#ec008c', ' #6739b6']}>
                gradual-pink
              </Button>
              <Button backgroundColor={['#0081ff', ' #1cbbb4']}>
                gradual-blue
              </Button>
            </Space>
          </Card>
        </Space>
      </View>
    );
  }
}
