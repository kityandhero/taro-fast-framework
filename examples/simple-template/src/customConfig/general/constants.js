export const fileTypeCollection = {
  image: 100,
  video: 200,
  audio: 300,
  file: 400,
};

export const jsonItemTypeCollection = {
  text: 0,
  multiText: 100,
  image: 200,
  video: 300,
  audio: 400,
  attachment: 500,
  link: 1000,
};

/**
 * 流程调试审批人模式值集合
 */
export const flowDebugApproverModeCollection = {
  /**
   * 全局适用
   * value : 0
   */
  debugUser: 0,

  /**
   * 流程配置账户
   * value : 100
   */
  flowConfiguration: 100,
};

export const flowEffectiveRangeCollection = {
  /**
   * 全局适用
   * value : 100
   */
  globalEffective: 100,

  /**
   * 范围内适用
   * value : 200
   */
  rangeEffective: 200,
};

/**
 * 流程审批动作集合
 */
export const flowApproveActionCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 通过
   * value : 100
   */
  pass: 100,

  /**
   * 拒绝
   * value : 200
   */
  refuse: 200,
};

/**
 * 流程审批动作模式集合
 */
export const flowApproveActionModeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 自动操作
   * value : 100
   */
  autoControl: 100,

  /**
   * 人工
   * value : 200
   */
  manualControl: 200,
};

/**
 * 流程应用范围值集合
 */
export const flowScopeCollection = {
  /**
   * 文章审核
   * value : 100
   */
  articleAudit: 100,

  /**
   * 流程审批
   * value : 200
   */
  processApproval: 200,
};

/**
 * 流程状态值集合
 */
export const flowStatusCollection = {
  /**
   * 禁用
   * value : 0
   */
  disable: 0,

  /**
   * 启用
   * value : 100
   */
  enable: 100,
};

/**
 * 流程表单设计状态值集合
 */
export const flowFormDesignStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程线条类型值集合
 */
export const flowLineTypeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 前进
   * value : 100
   */
  forward: 100,

  /**
   * 回退
   * value : 200
   */
  backward: 200,

  /**
   * 抄送
   * value : 300
   */
  carbonCopy: 300,
};

/**
 * 流程线条状态值集合
 */
export const flowLineStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点类型值集合
 */
export const flowNodeTypeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 起始点
   * value : 10
   */
  startNode: 10,

  /**
   * 过程点
   * value : 20
   */
  intermediateNode: 20,

  /**
   * 抄送点
   * value : 26
   */
  carbonCopyPoint: 26,

  /**
   * 终止点
   * value : 30
   */
  endNode: 30,
};

/**
 * 流程节点审批人模式值集合
 */
export const flowNodeApproverModeCollection = {
  /**
   * 无需人员审批
   * value : 0
   */
  none: 0,

  /**
   * 指定人员
   * value : 100
   */
  designated: 100,

  /**
   * 直属部门
   * value : 200
   */
  directlyAffiliatedDepartment: 200,
};

/**
 * 审批节点签批方式值集合
 */
export const flowNodeApproveModeCollection = {
  /**
   * 或签【需要首个审批的人员同意即可】
   * value : 0
   */
  oneAgree: 0,

  /**
   * 或签【需要全部审批的人员同意方可】
   * value : 100
   */
  allAgree: 100,
};

/**
 * 流程节点状态值集合
 */
export const flowNodeStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点审批人状态值集合
 */
export const flowNodeApproverStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点条件判断标准值集合
 */
export const flowBranchConditionJudgmentModeCollection = {
  /**
   * 符合全部
   * value : 100
   */
  and: 100,

  /**
   * 符合其一
   * value : 200
   */
  or: 200,
};

/**
 * 流程节点条件状态值集合
 */
export const flowBranchConditionStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点条件项对比模式值集合
 */
export const flowBranchConditionItemTargetComparisonModelCollection = {
  /**
   * 相等
   * value : 0
   */
  eq: 0,

  /**
   * 不等于
   * value : 0
   */
  ne: 10,

  /**
   * 大于
   * value : 100
   */
  gt: 100,

  /**
   * 大于等于
   * value : 110
   */
  gte: 110,

  /**
   * 小于
   * value : 200
   */
  lt: 200,

  /**
   * 小于等于
   * value : 210
   */
  lte: 210,

  /**
   * 小于等于
   * value : 300
   */
  rangeWithGtAndLt: 300,

  /**
   * 范围值[大于等于 ~ 小于]
   * value : 310
   */
  rangeWithGteAndLt: 310,

  /**
   * 范围值[大于 ~ 小于等于]
   * value : 320
   */
  rangeWithGtAndLte: 320,

  /**
   * 范围值[大于等于 ~ 小于等于]
   * value : 330
   */
  rangeWithGteAndLte: 330,
};

/**
 * 流程节点条件项数据源模式值集合
 */
export const flowBranchConditionItemTargetSourceModeCollection = {
  /**
   * 表单字段
   * value : 100
   */
  formField: 100,

  /**
   * 远程调用
   * value : 1000
   */
  remoteCall: 1000,
};

/**
 * 流程节点条件项数据类型值集合
 */
export const flowBranchConditionItemTargetTypeCollection = {
  /**
   * 数字
   * value : 100
   */
  number: 100,

  /**
   * 文本
   * value : 200
   */
  string: 200,
};

/**
 * 流程节点条件项状态值集合
 */
export const flowBranchConditionItemStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例状态值集合
 */
export const flowCaseStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 新创建
   * value : 100
   */
  created: 100,

  /**
   * 审批驳回
   * value : 110
   */
  refuse: 110,

  /**
   * 递交审批
   * value : 200
   */
  submitApproval: 200,

  /**
   * 审批中
   * value : 300
   */
  inApprovalProcess: 300,

  /**
   * 审批完成
   * value : 400
   */
  success: 400,

  /**
   * 强制结束（即该次审批作废）
   * value : 500
   */
  forcedEnd: 500,
};

/**
 * 流程实例下一审批信息数据状态值集合
 */
export const flowCaseNextProcessApproveStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例下一审批通知数据状态值集合
 */
export const flowCaseNextProcessNotificationStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例下一审批流程数据状态值集合
 */
export const flowCaseNextProcessProgressStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程历史数据状态值集合
 */
export const flowCaseProcessHistoryStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程表单附件存储数据状态值集合
 */
export const flowCaseFormAttachmentStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程表单键值存储数据状态值集合
 */
export const flowCaseFormStorageStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程审批移动端视图模式值集合
 */
export const flowApproveMobileViewModeCollection = {
  /**
   * 表单
   * value : 0
   */
  form: 0,

  /**
   * 文档
   * value : 100
   */
  document: 100,
};
