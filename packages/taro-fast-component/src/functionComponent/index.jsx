import { AdvanceButton } from '../customComponents';

export function buildAdvanceButton({
  style,
  color,
  fill,
  block,
  shape,
  additionalClassName,
  inner,
  size = 'default',
  type = 'default',
  plain = false,
  disabled = false,
  loading = false,
  loadingColor = '',
  loadingText = '',
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
    <AdvanceButton
      style={style}
      color={color}
      fill={fill}
      block={block}
      shape={shape}
      additionalClassName={additionalClassName}
      onClick={onClick}
      size={size}
      type={type}
      plain={plain}
      disabled={disabled}
      loading={loading}
      loadingColor={loadingColor}
      loadingText={loadingText}
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
      {inner}
    </AdvanceButton>
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
