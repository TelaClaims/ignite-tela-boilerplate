// @cliDescription  Generates a stateful/pure/stateless component

const patterns = require('../lib/patterns')

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem, parameters, print, strings } = context
  const { pascalCase, camelCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [
    {
      template: 'redux/index.ejs',
      target: `App/Redux/${name}/index.js`
    },
    {
      template: 'redux/constants.ejs',
      target: `App/Redux/${name}/constants.js`
    },
    {
      template: 'redux/initial-state.ejs',
      target: `App/Redux/${name}/initial-state.js`
    },
    {
      template: 'redux/reducer.ejs',
      target: `App/Redux/${name}/reducer.js`
    },
    {
      template: 'redux/thunk.ejs',
      target: `App/Redux/${name}/thunk.js`
    }
  ]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props)

  // add reducer to store
  const reducerFilePath = `${process.cwd()}/App/Redux/index.js`
  const reducerToAdd = `${camelCase(name)}: require('./${name}/reducer').reducer`

  if (!filesystem.exists(reducerFilePath)) {
    const msg = `No '${reducerFilePath}' file found.  Can't insert reducer.`
    print.error(msg)
    process.exit(1)
  }

  // insert reducer
  ignite.patchInFile(reducerFilePath, {
    before: patterns[patterns.constants.PATTERN_REDUCERS],
    insert: reducerToAdd
  })
}
