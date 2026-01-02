import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { isArray } from 'easy-soft-utility';

import {
  flexDirectionCollection,
  flexJustifyCollection,
  transformSize,
} from 'taro-fast-common';
import { Col, FlexBox, Line, MultiLineText, Row } from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { HeadNavigationBox } from '../../../../utils';
import { homeComplaint } from '../../../customConfig';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '留言须知',
  navigationStyle: 'custom',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
class Illustrate extends PageWrapper {
  viewStyle = {
    backgroundColor: '#fff',
    paddingLeft: transformSize(12),
    paddingRight: transformSize(12),
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="留言须知" />;
  };

  buildIllustrateBox = ({ description }) => {
    const descriptions = isArray(description) ? description : [description];

    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: transformSize(32),
          overflow: 'hidden',
          paddingTop: transformSize(30),
          paddingLeft: transformSize(24),
          paddingRight: transformSize(24),
          paddingBottom: transformSize(30),
        }}
      >
        <Row
          direction={flexDirectionCollection.column}
          justify={flexJustifyCollection.between}
        >
          {descriptions.map((o, index) => {
            return (
              <Col key={`description-${index}`}>
                <FlexBox
                  flexAuto="right"
                  left={
                    <View
                      style={{
                        paddingLeft: transformSize(10),
                        paddingRight: transformSize(16),
                        paddingTop: transformSize(5),
                        paddingBottom: transformSize(5),
                        marginTop: transformSize(4),
                        marginBottom: transformSize(4),
                      }}
                    >
                      <MultiLineText
                        style={{ color: '#a3a3a3' }}
                        fontSize={40}
                        lineHeight={52}
                        text={o}
                      />
                    </View>
                  }
                  right={<View />}
                />
              </Col>
            );
          })}
        </Row>
      </View>
    );
  };

  renderFurther() {
    return (
      <>
        <Line transparent height={18} />

        {this.buildIllustrateBox({
          image: homeComplaint,
          title: '我要投诉',
          description: [
            '1. 为了你的留言得到及时有效处理，请填写个人真实信息，如实反映有关情况。我们将严格控制个人信息知悉范围。',
            '2. 我们将对大家反映的意见建议进行汇总整理和专门研究，并转给有关方面处理。但可能不对留言者-一作出回复，敬请谅解。',
            '3. 你反映的意见建议及处理情况有可能以适当方式向社会公开。如果你希望保护个人隐私，请在留言的同时作出声明，我们将充分尊重你的意愿。',
          ],
        })}
      </>
    );
  }
}

export default Illustrate;
