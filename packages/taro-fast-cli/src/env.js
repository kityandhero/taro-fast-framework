const { resolve } = require('path')
const fs = require('fs-extra')
const term = require('terminal-kit').terminal
const shell = require('shelljs')
const download = require('download')
const agent = require('hpagent')
const ping = require('ping')

const { HttpsProxyAgent } = agent

const packageUrlGithub =
  'https://raw.githubusercontent.com/kityandhero/taro-fast-framework/master/packages/simple-taro-fast-framework/package.json'

const packageUrlGitee =
  'https://gitee.com/lzt/taro-fast-framework/raw/main/packages/simple-taro-fast-framework/package.json'

exports.run = async function (s, o) {
  const {
    _optionValues: { agent, file },
  } = o

  let packageTempPath = ''

  showMessage(`prepare to update package.json: `)

  showLine()

  try {
    packageTempPath = await handleTempPackagePath({
      agent,
      file,
      packageUrl: packageUrlGithub,
      repo: 'github',
    })
  } catch (error) {
    showLine()

    showWarn(
      `use github repo failure! switch to gitee, gitee repo possible update delay.`,
    )

    showLine()

    try {
      packageTempPath = await handleTempPackagePath({
        agent: '',
        file,
        packageUrl: packageUrlGitee,
        repo: 'gitee',
      })
    } catch (error) {
      showLine()

      console.error(error)

      showLine()

      showWarn('download error, please check network')

      process.exit()
    }
  }

  handlePackage(packageTempPath)
}

async function handleTempPackagePath({ agent, file, packageUrl, repo }) {
  let packageTempPath = ''

  if (file) {
    showMessage(`use local referential package.json`)

    showMessage(`file path: ${file}`)

    showLine()

    packageTempPath = resolve(file)
  } else {
    showMessage(`try ${repo} repo`)

    if (agent) {
      showMessage(`agent: ${agent}`)
    }

    showMessage(`${repo} repo: ${packageUrl}`)

    await download(packageUrl, resolve(`./temp`), {
      ...(agent
        ? {
            agent: {
              https: new HttpsProxyAgent({
                keepAlive: true,
                keepAliveMsecs: 1000,
                maxSockets: 256,
                maxFreeSockets: 256,
                scheduling: 'lifo',
                proxy: agent,
              }),
            },
          }
        : {}),
    })

    showMessage(`use ${repo} repo success!`)

    packageTempPath = resolve(`./temp/package.json`)

    showMessage(`packageTempPath: ${packageTempPath}`)
  }

  return packageTempPath
}

function handlePackage(packageTempPath) {
  showMessage(`referential package.json :${packageTempPath}`)

  const packageProjectPath = resolve(`./package.json`)

  fs.readJson(packageTempPath)
    .then((packageTemp) => {
      fs.readJson(packageProjectPath)
        .then((p) => {
          const dependencies = packageTemp.dependencies
          const devDependencies = packageTemp.devDependencies

          p.dependencies = dependencies
          p.devDependencies = devDependencies

          fs.writeJson(packageProjectPath, p)
            .then(() => {
              showMessage(`update package.json success!`)

              showLine()

              process.exit()
            })
            .catch((err) => {
              console.error(err)

              process.exit()
            })
        })
        .catch((err) => {
          console.error(err)

          process.exit()
        })
    })
    .catch((err) => {
      console.error(err)

      process.exit()
    })
}

function showMessage(message) {
  term.green(`${message}\r\n`)
}

function showWarn(message) {
  term.red(`${message}\r\n`)
}

function showLine() {
  term.gray('------------------------------------\r\n')
}
