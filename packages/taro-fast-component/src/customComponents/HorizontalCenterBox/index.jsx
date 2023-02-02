import { BaseComponent } from '../BaseComponent';
import { Col } from '../Flex/Col';
import { Row } from '../Flex/Row';

const defaultProps = {
  style: {},
  fillHeight: true,
};

class HorizontalCenterBox extends BaseComponent {
  renderFurther() {
    const { style: styleSource, fillHeight } = this.props;

    const style = {
      ...styleSource,
      ...(!!fillHeight ? { height: '100%' } : {}),
    };

    return (
      <Row justify="center" style={style}>
        <Col auto style={style} />
        <Col style={style}>{this.props.children}</Col>
        <Col auto style={style} />
      </Row>
    );
  }
}

HorizontalCenterBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { HorizontalCenterBox };
