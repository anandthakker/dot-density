'use strict'

let random = require('./random')

/**
 * @callback FeaturePopulationCallback
 * @param {Feature} feature A geojson feature
 * @return {Number} The feature's population
 */

/**
 * Produce dot density from population polygons
 * @param {Feature|FeatureCollection} data - an input
 * @param {object} options
 * @param {String|FeaturePopulationCallback} options.population the property key or accessor function providing each feature's population.
 * @param {number} [options.sampleRate=1] Number of dots per person
 * @returns {FeatureCollection} A dot density FeatureCollection
 * @example
 * var square = require('square')
 * square(5)
 */
module.exports = function dotdensity (data, options) {
  let dots = []
  if (data.type === 'FeatureCollection') { data = data.features }
  if (Array.isArray(data)) {
    data.forEach(function (feature) {
      dots.push.apply(dots, dotdensity(feature, options))
    })
  } else if (data.type === 'Feature') {
    let pop = typeof options.population === 'function'
      ? options.population(data)
      : data.properties[options.population]
    let count = Math.round(+pop * (options.sampleRate || 1))
    while (count-- > 0) {
      dots.push(random(data))
    }
  } else {
    throw new Error('Input data is not a Feature, array of Features, or FeatureCollection')
  }

  return dots.filter(Boolean)
}

