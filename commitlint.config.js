/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

module.exports = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
  ],
  parserPreset: 'conventional-changelog-conventionalcommits',
  prompt: {
    messages: {
      skip: '[可跳过]',
      max: '[字数上限: %d]',
      min: '[字数下限: %d]',
      emptyWarning: '此为必填项目, 不能为空白',
      upperLimitWarning: '超过最大限制',
      lowerLimitWarning: '低于最小限制',
    },
    questions: {
      type: {
        description: '择要提交的更改类型:',
        enum: {
          feat: {
            description: '新功能/特性',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Bug修补',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档变更',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '不影响含义的更改(空白、格式、错误码、分号等)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '代码重构(既不修复bug也不添加特性的更改)',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '改进性能的调整',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或纠正现有的测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              '影响构建系统或外部依赖的更改(例如:gulp, broccoli, npm等)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              '更改CI配置文件和脚本(例如:Travis、Circle、BrowserStack、SauceLabs等)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: '其他不修改src或测试文件的更改',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '恢复前一个提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: '此更改的范围是什么(例如:组件或文件名)',
      },
      subject: {
        description: '用简短的祈使语句描述变化',
      },
      body: {
        description: '对变更提供更详细的描述',
      },
      isBreaking: {
        description: '有什么突破性的变化吗?',
      },
      breakingBody: {
        description: '中断变更提交需要一个主体. 请输入提交本身的更长的描述',
      },
      breaking: {
        description: '描述突破性的变化',
      },
      isIssueAffected: {
        description: '这个变化会影响任何未决问题吗?',
      },
      issuesBody: {
        description:
          '如果问题被关闭, 则提交需要一个主体. 请输入提交本身的更长的描述',
      },
      issues: {
        description: '添加问题引用(例如:"fix #123",  "re #123".)',
      },
    },
  },
};
