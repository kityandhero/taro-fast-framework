import classNames from 'classnames';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  CenterBox,
  FlexBox,
  Grid,
  ImageBox,
} from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import logoImg from '../../../../assets/images/logo.png';
import BasePageWrapper from '../../BasePageWrapper';

import './index.less';

export const classPrefix = `template-grid-banner`;

const boxStyle = {
  padding: `${transformSize(20)} 0`,
  height: transformSize(120),
  color: 'var(--tfc-color-grey)',
};

const nameStyle = {
  width: '100%',
  fontSize: transformSize(28),
  height: transformSize(36),
  lineHeight: transformSize(36),
  textAlign: 'center',
  margin: `${transformSize(20)} 0`,
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
