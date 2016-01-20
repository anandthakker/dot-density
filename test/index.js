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

test('stochastic', function (t) {
  let data = require('./fixtures/blocks.json').features[0]
  data.properties.pop = 0.3

  let trials = 1000
  let points = 0
  while (trials-- > 0) {
    points += dots(data, { stochastic: true, population: 'pop' }).length
  }

  console.log('Got ' + points)

  t.ok(points > 200)
  t.ok(points < 400)

  t.end()
})

test('from feature collection', function (t) {
  let data = require('./fixtures/blocks.json')

  let output = dots(data, { population: 'POP10' })
  t.ok(output.every(f => f.geometry.type === 'Point'), 'outputs Point geometries')
  t.end()
})

test('error on bad input', function (t) {
  let expected = new Error('Input data is not a Feature, array of Features, or FeatureCollection')
  t.throws(function () {
    dots({}, { population: 'POP10' })
  }, expected)
  t.throws(function () {
    dots(null, {})
  }, expected)
  t.end()
})

