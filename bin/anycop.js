#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const program = require('commander')

program
  .version('0.0.1', '-v, --version')
  .option(
    '-c, --config  [path]',
    'Path to configuration file.'
  )
  .option(
    '-t, --targetDir [path]',
    'Path to target directory.'
  )
  .parse(process.argv)

let config
try {
  const configFileName =
    program.config || 'anycop.config.js'
  config = {
    ...require('../dist/config').createConfig(),
    ...require(path.resolve(configFileName))
  }
} catch {
  config = require('../dist/config').createConfig()
} finally {
  require('../dist').run({
    build: program.build,
    ...config
  })
}
