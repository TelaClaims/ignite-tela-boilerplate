// @cliDescription  Generates a stateful/pure/stateless component

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, parameters, print, strings } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  // which state type of component
  const typeComponentMessage = 'What type of component?'
  const typeComponentChoices = ['Stateless', 'Component', 'PureComponent']

  let type = parameters.options.type

  // only prompt if type is not defined
  if (!type) {
    const answers = await context.prompt.ask({
      name: 'type',
      type: 'list',
      message: typeComponentMessage,
      choices: typeComponentChoices
    })
    type = answers.type
  }
  props.type = type

  const file = type === 'Stateless' ? 'stateless' : 'component'

  const jobs = [
    {
      template: `component/${file}.ejs`,
      target: `App/Components/${name}/index.js`
    },
    {
      template: 'component/styles.ejs',
      target: `App/Components/${name}/styles.js`
    },
    {
      template: `component/${file}.test.ejs`,
      target: `App/Components/${name}/test.js`
    }
  ]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props)
}
