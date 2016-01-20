'use strict'

let test = require('tap').test
let inside = require('turf-inside')
let dots = require('../')

test('from feature', function (t) {
  let data = require('./fixtures/blocks.json').features[0]
  let output = dots(data, { population: 'POP10' })
  t.ok(output.every(f => f.geometry.type === 'Point'), 'outputs Point geometries')
  t.ok(output.every(p => inside(p, data)), 'every point within target polygon')
  t.equal(output.length, data.properties.POP10, 'one point per person')
  t.end()
})

test('sample rate', function (t) {
  let data = require('./fixtures/blocks.json').features[0]
  let output = dots(data, {
    population: 'POP10',
    sampleRate: 0.5
  })

  t.ok(output.every(f => f.geometry.type === 'Point'), 'outputs Point geometries')
  t.ok(output.every(p => inside(p, data)), 'every point within target polygon')
  t.equal(output.length, data.properties.POP10 / 2, '0.5 dots per person')
  t.end()
})

test('population accessor function', function (t) {
  let data = require('./fixtures/blocks.json').features[0]
  let output = dots(data, {
    population: f => f.properties.POP10
  })

  t.ok(output.every(f => f.geometry.type === 'Point'), 'outputs Point geometries')
  t.ok(output.every(p => inside(p, data)), 'every point within target polygon')
  t.equal(output.length, data.properties.POP10, '0.5 dots per person')
  t.end()
})

test('from feature collection', function (t) {
  let data = require('./fixtures/blocks.json')

  let output = dots(data, { population: 'POP10' })
  t.ok(output.every(f => f.geometry.type === 'Point'), 'outputs Point geometries')
  t.end()
})

