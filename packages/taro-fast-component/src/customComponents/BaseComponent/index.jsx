import { AbstractComponent } from 'taro-fast-common';

const defaultProps = {};

class BaseComponent extends AbstractComponent {
  // eslint-disable-next-line no-unused-vars
  adjustShowRenderCountInConsole = (nextProperties, nextState) => {
    {
      const { showRenderCount } = nextProperties;

      this.showRenderCountInConsole = !!showRenderCount || false;
    }
  };
}

BaseComponent.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { BaseComponent };
