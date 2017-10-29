// @cliDescription  Generates a screen with a ListView/Flatlist/SectionList + walkthrough.

module.exports = async function (context) {
  // grab some features
  const { print, parameters, strings, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate list <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const screenName = name.endsWith('List') ? name : `${name}List`
  const props = { name: screenName }

  // which type of list in code
  const typeCodeMessage = 'What coding style do you want for your list?'
  const typeCodeChoices = ['Flatlist', 'SectionList']

  // which type of layout?
  const typeMessage = 'What kind of List would you like to generate?'
  const typeChoices = ['Row', 'Grid']

  // Check for parameters to bypass questions
  let typeCode = parameters.options.codeType
  let type = parameters.options.type

  // only prompt if type is not defined
  if (!typeCode) {
    // as question 1
    const codeAnswers = await context.prompt.ask({
      name: 'type',
      type: 'list',
      message: typeCodeMessage,
      choices: typeCodeChoices
    })
    typeCode = codeAnswers.type === typeCodeChoices[0] ? 'flatlist' : 'sectionlist'
  }

  if (!type) {
    if (typeCode === 'flatlist') {
      // ask question 2
      const answers = await
      context.prompt.ask({
        name: 'type',
        type: 'list',
        message: typeMessage,
        choices: typeChoices
      })
      type = answers.type
    } else {
      print.info(`SectionList does not support the 'numColumns' attribute\n`)
      print.info('We recommend nesting (it\'s a Bird release thing)')
      return
    }
  }

  let component = typeCode
  let styles = 'styles'
  // Different logic depending on code types
  if (typeCode === 'flatlist' && type.toLowerCase() === 'grid') {
    component += '-grid'
    styles = 'flatlist-grid-styles'
  }

  const jobs = [
    {
      template: `component/${component}.ejs`,
      target: `App/Components/${name}/component.js`
    },
    {
      template: `component/${styles}.ejs`,
      target: `App/Components/${name}/styles.js`
    },
    {
      template: `component/test.ejs`,
      target: `App/Components/${name}/test.js`
    },
    {
      template: `component/index.ejs`,
      target: `App/Components/${name}/index.js`
    }
  ]

  await ignite.copyBatch(context, jobs, props)
}
