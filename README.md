[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Install

`npm install -g dot-density` for CLI or `npm install --save dot-density` for use as library.

## CLI

    cat someCensusData.geojson | dot-density --population POP10 --sampleRate 0.1

## API

### FeaturePopulationCallback

**Parameters**

-   `feature` **Feature** A geojson feature

Returns **Number** The feature's population

### index

Produce dot density from population polygons

**Parameters**

-   `data` **Feature or FeatureCollection** an input
-   `options` **object** 
    -   `options.population` **String or FeaturePopulationCallback** the property key or accessor function providing each feature's population.
    -   `options.sampleRate` **[number]** Number of dots per person (optional, default `1`)
    -   `options.stochastic` **[boolean]** If true, then use a weighted dice roll to decide wwhether to add a point when population * sampleRate yields a fractional value. (optional, default `false`)

**Examples**

```javascript
var dots = require('dot-density')
var points = dots(featureCollection, { population: 'POP10' })
console.log(points) // array of Point features
```

Returns **FeatureCollection** A dot density FeatureCollection
