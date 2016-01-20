#!/usr/bin/env node

'use strict'

let fs = require('fs')
let argv = require('minimist')(process.argv.slice(2))
let features = require('geojson-stream').parse
let fc = require('geojson-stream').stringify
let through = require('through2')
let dots = require('./')

let input
if (argv._[0]) {
  input = fs.createReadStream(argv._[0])
} else {
  input = process.stdin
}

input.pipe(features())
.pipe(through.obj(function (feat, _, next) {
  dots(feat, argv).forEach(dot => this.push(dot))
  next()
}))
.pipe(fc())
.pipe(process.stdout)
