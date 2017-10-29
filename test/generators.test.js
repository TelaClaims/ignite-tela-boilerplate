const execa = require('execa')
const jetpack = require('fs-jetpack')
const tempy = require('tempy')

const IGNITE = 'ignite'
const APP = 'IntegrationTest'
const BOILERPLATE = `${__dirname}/..`

const FILE = 'Test'
const DIR = `App/Components/${FILE}`

// calling the ignite cli takes a while
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('generators', () => {
  beforeAll(async () => {
    // creates a new temp directory
    process.chdir(tempy.directory())
    await execa(IGNITE, ['new', APP, '--min', '--skip-git', '--boilerplate', BOILERPLATE])
    process.chdir(APP)
  })

  afterEach(() => {
    jetpack.remove(DIR)
  })

  describe('component', () => {
    test('stateless', async () => {
      await execa(IGNITE, ['g', 'component', FILE, '--type=Stateless'], { preferLocal: false })
      expect(jetpack.exists(`App/Components/Test/index.js`)).toBe('file')
      expect(jetpack.exists(`${DIR}/test.js`)).toBe('file')
      expect(jetpack.exists(`${DIR}/styles.js`)).toBe('file')
      const lint = await execa('npm', ['-s', 'run', 'lint'])
      expect(lint.stderr).toBe('')
    })

    test('component', async () => {
      await execa(IGNITE, ['g', 'component', FILE, '--type=Component'], { preferLocal: false })
      expect(jetpack.exists(`${DIR}/index.js`)).toBe('file')
      expect(jetpack.exists(`${DIR}/test.js`)).toBe('file')
      expect(jetpack.exists(`${DIR}/styles.js`)).toBe('file')
      const lint = await execa('npm', ['-s', 'run', 'lint'])
      expect(lint.stderr).toBe('')
    })

    test('pure component', async () => {
      await execa(IGNITE, ['g', 'component', FILE, '--type=PureComponent'], { preferLocal: false })
      expect(jetpack.exists(`${DIR}/index.js`)).toBe('file')
      expect(jetpack.exists(`${DIR}/test.js`)).toBe('file')
      expect(jetpack.exists(`${DIR}/styles.js`)).toBe('file')
      const lint = await execa('npm', ['-s', 'run', 'lint'])
      expect(lint.stderr).toBe('')
    })
  })
})
