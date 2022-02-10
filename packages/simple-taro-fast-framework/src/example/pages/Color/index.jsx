import {
  Card,
  Space,
  Button,
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
    id: 'Color',
    name: '颜色',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="颜色"
          style={style}
          headerStyle={cardHeaderStyle}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '内置CSS变量举例: --tfc-color-red',
                },
                {
                  text: '使用举例: {color:var(--tfc-color-red)}',
                },
              ]}
            />
          }
        >
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

        <Card header="浅色" style={style} headerStyle={cardHeaderStyle}>
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

        <Card header="渐变色" style={style} headerStyle={cardHeaderStyle}>
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
    );
  };
}
