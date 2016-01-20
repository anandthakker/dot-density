[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## API

### FeaturePopulationCallback

**Parameters**

-   `feature` **Feature** A geojson feature
-   `data`  
-   `options`  

Returns **Number** The feature's population

### index

Produce dot density from population polygons

**Parameters**

-   `data` **Feature or FeatureCollection** an input
-   `options` **object** 
    -   `options.population` **String or FeaturePopulationCallback** the property key or accessor function providing each feature's population.
    -   `options.sampleRate` **[number]** Number of dots per person (optional, default `1`)

**Examples**

```javascript
var square = require('square')
square(5)
```

Returns **FeatureCollection** A dot density FeatureCollection
