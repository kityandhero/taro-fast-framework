import classNames from 'classnames';
import { connect } from 'easy-soft-dva';
import { View } from '@tarojs/components';

import {
  CenterBox,
  FlexBox,
  Grid,
  ImageBox,
} from 'taro-fast-component/es/customComponents';

import logoImg from '../../../../assets/images/logo.png';
import BasePageWrapper from '../../BasePageWrapper';

import './index.less';

export const classPrefix = `template-grid-banner`;

const boxStyle = {
  padding: 'var(--tfc-20) 0',
  height: 'var(--tfc-120)',
  color: 'var(--tfc-color-grey)',
};

const nameStyle = {
  width: '100%',
  fontSize: 'var(--tfc-28)',
  height: 'var(--tfc-36)',
  lineHeight: 'var(--tfc-36)',
  textAlign: 'center',
  margin: 'var(--tfc-20) 0',
};

const navList = [
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
  {
    image: logoImg,
    value: '文字',
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--宫格导航',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  renderFurther() {
    return (
      <View className={classNames(classPrefix)}>
        <Grid
          columns={4}
          list={navList}
          itemBuilder={({ item, index }) => {
            const { image, value } = item;

            return (
              <Grid.Item key={`nav_${index}`}>
                <FlexBox
                  style={boxStyle}
                  flexAuto="top"
                  top={
                    <CenterBox>
                      <View className={classNames(`${classPrefix}__imageBox`)}>
                        <ImageBox src={image} />
                      </View>
                    </CenterBox>
                  }
                  bottom={<View style={nameStyle}>{value}</View>}
                />
              </Grid.Item>
            );
          }}
        />
      </View>
    );
  }
}
