const { resolve } = require('path')
const fs = require('fs-extra')
const term = require('terminal-kit').terminal
const download = require('download-git-repo')

const source = 'kityandhero/taro-fast-template'

const gitUrl = `https://github.com/${source}`

const downloadUrl = `direct:https://codeload.github.com/${source}/zip/main`

exports.run = function () {
  term('Please enter project name: ')

  term.inputField({}, function (error, input) {
    if (error) {
      console.log(error)

      process.exit()
    } else {
      let folder = input

      if (isEmpty(folder)) {
        console.log('project name not allow empty')

        process.exit()
      } else {
        const dir = resolve(`./${folder}`)

        existDirectory(dir, (error, result) => {
          if (result) {
            term.red('\rproject dir already exist, please choose another')

            process.exit()
          } else {
            console.log(`\rtemplate url:${gitUrl}`)
            console.log(`target folder:${dir}`)
            console.log('will start download, please wait a moment...')

            download(downloadUrl, dir, { clone: false }, (err) => {
              console.log(err ? err : 'download success')

              if (!err) {
                term.green(
                  'we build a simple project repo is here: https://github.com/kityandhero/taro-fast-framework.git',
                )
              }

              process.exit()
            })
          }
        })
      }
    }
  })
}

function isEmpty(v) {
  v = v
    .trim()
    .replace(/\t/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s*/g, '')

  while (v.indexOf('  ') >= 0) {
    v = v.replace(/  /g, ' ')
  }

  return !v
}

/**
 * check folder exist
 * @param {*} directory
 * @param {*} callback
 * @returns
 */
function existDirectory(directory, callback) {
  if (!directory || typeof directory !== 'string') {
    throw new TypeError(
      'directory-exists expects a non-empty string as its first argument',
    )
  }

  if (typeof callback === 'undefined') {
    return new Promise(function (resolve, reject) {
      fs.stat(resolve(directory), function (err, stat) {
        if (err) {
          return resolve(false)
        }

        resolve(stat.isDirectory())
      })
    })
  } else {
    fs.stat(resolve(directory), function (err, stat) {
      if (err) {
        return callback(null, false)
      }

      callback(null, stat.isDirectory())
    })
  }
}
