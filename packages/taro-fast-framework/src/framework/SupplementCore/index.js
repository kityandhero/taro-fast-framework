import Common from '../Common';

class SupplementCore extends Common {
  doShowTask = () => {
    if (!this.firstShowHasTriggered) {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
    } else {
      this.doWorkWhenRepeatedShow();
    }

    this.doWorkWhenEveryShow();

    this.doWorkAfterShow();
  };
}

export default SupplementCore;
