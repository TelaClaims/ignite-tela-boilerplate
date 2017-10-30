const constants = {
  PATTERN_IMPORTS: 'imports',
  PATTERN_ROUTES: 'routes',
  PATTERN_REDUCERS: 'reducers'
}

module.exports = {
  constants,
  [constants.PATTERN_IMPORTS]: `import[\\s\\S]*from\\s+'react-navigation';?`,
  [constants.PATTERN_ROUTES]: 'const PrimaryNav',
  [constants.PATTERN_REDUCERS]: '\\}\\)'
}
