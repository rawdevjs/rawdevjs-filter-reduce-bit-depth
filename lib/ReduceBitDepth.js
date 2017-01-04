'use strict'

const Image = require('rawdevjs-image')

class ReduceBitDepth {
  constructor () {
    this.label = 'reduce bit depth'
    this.inPlace = false
    this.dirty = true
  }

  process (image) {
    let output = new Image(Image.Types.RGB24, {
      width: image.width,
      height: image.height
    })

    let outputPixel = new Array(output.components.length)

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        let p = image.getPixel(x, y)

        for (let c = 0; c < outputPixel.length; c++) {
          outputPixel[c] = p[c] / 256
        }

        output.setPixel(x, y, outputPixel)
      }
    }

    return Promise.resolve(output)
  }
}

module.exports = ReduceBitDepth
