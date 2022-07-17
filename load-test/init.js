const { spawn } = require('child_process')
const chalk = require('chalk')
const path = require('path')
const glob = require('glob-fs')({ gitignore: true })

class ArtilleryTest {
  constructor() {
    this.isWin = process.platform === 'win32'
    this.path = path.join(__dirname, './../../')
  }

  run() {
    this.runDir(this.path)
  }

  async runDir(dirPath) {
    const files = glob.readdirSync(`**/*.test.yml`)
    files.forEach((file) => {
      let testDir = path.join(dirPath, file)
      this.startLoadTest(testDir)
    })
  }

  startLoadTest(file) {
    if (this.isWin) {
      this.startWindowTest(file)
    } else {
      this.startOtherTest(file)
    }
  }

  getArtillery() {
    return './node_modules/.bin/artillery'
  }

  startWindowTest(file) {
    let cp = spawn(process.env.comspec, [
      '/c',
      'artillery run -e production ' + file,
    ])
    this.assingArtillaryOptions(cp)
  }

  startOtherTest(file) {
    let cp = spawn(this.getArtillery(), [
      'run',
      '-e',
      'production',
      '-o',
      './tests/artillery/report.json',
      file,
    ])
    this.assingArtillaryOptions(cp)
  }

  assingArtillaryOptions(cp) {
    cp.stdout.on('data', function (data) {
      console.log(chalk.white.bold(data.toString())) // logging on test process
    })

    cp.stderr.on('data', function (data) {
      console.log(chalk.redBright.bold(data.toString())) // logging on test fails process
    })

    cp.on('exit', function (code) {
      console.log(
        chalk.gray.bold('child process exited with code ' + code.toString())
      )
    })
  }
}

const test = new ArtilleryTest()
test.run()
