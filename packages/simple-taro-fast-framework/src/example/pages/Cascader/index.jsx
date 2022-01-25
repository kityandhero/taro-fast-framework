import { View } from '@tarojs/components';

import { roundToTarget, getGuid } from 'taro-fast-common/es/utils/tools';
import { Cascader, Card } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const options = [
  {
    label: '0-0',
    value: '0-0',
    children: [
      {
        label: '0-0-0',
        value: '0-0-0',
        children: [
          {
            label: '0-0-0-0',
            value: '0-0-0-0',
          },
          {
            label: '0-0-0-1',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: '0-0-1',
        value: '0-0-1',
        children: [
          {
            label: '0-0-1-0',
            value: '0-0-1-0',
          },
          {
            label: '0-0-1-1',
            value: '0-0-1-1',
          },
        ],
      },
      {
        label: '0-0-2',
        value: '0-0-2',
        children: [
          {
            label: '0-0-2-0',
            value: '0-0-2-0',
          },
          {
            label: '0-0-2-1',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '0-1',
    value: '0-1',
    children: [
      {
        label: '0-1-0',
        value: '0-1-0',
        children: [
          {
            label: '0-1-0-0',
            value: '0-1-0-0',
          },
          {
            label: '0-1-0-1',
            value: '0-1-0-1',
          },
        ],
      },
      {
        label: '0-1-1',
        value: '0-1-1',
        children: [
          {
            label: '0-1-1-0',
            value: '0-1-1-0',
          },
          {
            label: '0-1-1-1',
            value: '0-1-1-1',
          },
        ],
      },
      {
        label: '0-1-2',
        value: '0-1-2',
        children: [
          {
            label: '0-1-2-0',
            value: '0-1-2-0',
          },
          {
            label: '0-1-2-1',
            value: '0-1-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '0-2',
    value: '0-2',
    children: [
      {
        label: '0-2-0',
        value: '0-2-0',
        children: [
          {
            label: '0-2-0-0',
            value: '0-2-0-0',
          },
          {
            label: '0-2-0-1',
            value: '0-2-0-1',
          },
        ],
      },
      {
        label: '0-2-1',
        value: '0-2-1',
        children: [
          {
            label: '0-2-1-0',
            value: '0-2-1-0',
          },
          {
            label: '0-2-1-1',
            value: '0-2-1-1',
          },
        ],
      },
      {
        label: '0-2-2',
        value: '0-2-2',
        children: [
          {
            label: '0-2-2-0',
            value: '0-2-2-0',
          },
          {
            label: '0-2-2-1',
            value: '0-2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '0-3',
    value: '0-3',
    children: [
      {
        label: '0-3-0',
        value: '0-3-0',
        children: [
          {
            label: '0-3-0-0',
            value: '0-3-0-0',
          },
          {
            label: '0-3-0-1',
            value: '0-3-0-1',
          },
        ],
      },
      {
        label: '0-3-1',
        value: '0-3-1',
        children: [
          {
            label: '0-3-1-0',
            value: '0-3-1-0',
          },
          {
            label: '0-3-1-1',
            value: '0-3-1-1',
          },
        ],
      },
      {
        label: '0-3-2',
        value: '0-3-2',
        children: [
          {
            label: '0-3-2-0',
            value: '0-3-2-0',
          },
          {
            label: '0-3-2-1',
            value: '0-3-2-1',
          },
        ],
      },
    ],
  },
];

export default class Index extends PageWrapper {
  id = null;

  sTemp = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        color: '#ee0a24',
        percent: 0.3,
        size: 400,
      },
    };

    this.id = getGuid();
  }

  setPercent = (v) => {
    const { percent } = this.state;

    const tmp = roundToTarget(percent + v, 2);

    if (tmp <= 0) {
      this.setState({ percent: 0 });

      return;
    }

    if (tmp >= 1) {
      this.setState({ percent: 1 });

      return;
    }

    this.setState({ percent: tmp });
  };

  renderFurther() {
    // const { size, color, percent } = this.state;

    return (
      <View className="index">
        <Card header="demo" headerStyle={cardHeaderStyle} space={false}>
          <Cascader
            value={[
              options[2].value,
              options[2].children[1].value,
              options[2].children[1].children[1].value,
            ]}
            options={options}
          />
        </Card>
      </View>
    );
  }
}
