import { Button } from '@tarojs/components';

export function buildButton({
  text,
  className = '',
  size = 'default',
  type = 'default',
  plain = false,
  disabled = false,
  loading = false,
  formType = '',
  openType = '',
  hoverClass = 'button-hover',
  hoverStyle = 'none',
  hoverStopPropagation = false,
  hoverStartTime = 20,
  hoverStayTime = 70,
  lang = '',
  sessionFrom = '',
  sendMessageTitle = null,
  sendMessagePath = null,
  sendMessageImg = null,
  appParameter = null,
  scope = '',
  showMessageCard = false,
  onGetUserInfo = null,
  onGetAuthorize = null,
  onContact = null,
  onGetPhoneNumber = null,
  onGetRealnameAuthInfo = null,
  onError = null,
  onOpenSetting = null,
  onLaunchApp = null,
  onClick = null,
}) {
  return (
    <Button
      className={className}
      onClick={onClick}
      size={size}
      type={type}
      plain={plain}
      disabled={disabled}
      loading={loading}
      formType={formType}
      openType={openType}
      hoverClass={hoverClass}
      hoverStyle={hoverStyle}
      hoverStopPropagation={hoverStopPropagation}
      hoverStartTime={hoverStartTime}
      hoverStayTime={hoverStayTime}
      lang={lang}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      appParameter={appParameter}
      scope={scope}
      showMessageCard={showMessageCard}
      onGetUserInfo={onGetUserInfo}
      onGetAuthorize={onGetAuthorize}
      onContact={onContact}
      onGetPhoneNumber={onGetPhoneNumber}
      onGetRealnameAuthInfo={onGetRealnameAuthInfo}
      onError={onError}
      onOpenSetting={onOpenSetting}
      onLaunchapp={onLaunchApp}
    >
      {text}
    </Button>
  );
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
