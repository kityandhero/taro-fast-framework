import {
  redirectTo,
  stringIsNullOrWhiteSpace,
  showRuntimeError,
} from "../../utils/tools";
import { checkHasAuthority } from "../../utils/authority";
import { defaultSettingsLayoutCustom } from "../../utils/defaultSettingsSpecial";

import SupplementWrapper from "../SupplementWrapper";

class AuthorizationWrapper extends SupplementWrapper {
  componentAuthority = null;

  checkPermission = () => {
    if (stringIsNullOrWhiteSpace(this.componentAuthority)) {
      return;
    } else if (this.checkAuthority(this.componentAuthority)) {
      return;
    } else {
      const text = `无交互权限: ${this.componentAuthority}`;

      showRuntimeError({
        message: text,
      });

      const withoutPermissionRedirectPath =
        defaultSettingsLayoutCustom.getWithoutPermissionRedirectPath();

      if (stringIsNullOrWhiteSpace(withoutPermissionRedirectPath)) {
        throw new Error("未配置无交互权限时的跳转目标");
      }

      redirectTo(withoutPermissionRedirectPath);
    }
  };

  checkAuthority = (permission) => checkHasAuthority(permission);
}

export default AuthorizationWrapper;
