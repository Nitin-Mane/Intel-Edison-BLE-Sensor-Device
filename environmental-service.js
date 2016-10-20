var util = require('util')
var bleno = require('bleno')
var BlenoPrimaryService = bleno.PrimaryService
var TemperatureCharacteristic = require('./temperature-characteristic')

function EnvironmentalService() {
  EnvironmentalService.super_.call(this, {
    uuid: '181A',
    characteristics: [
      new TemperatureCharacteristic()
    ]
  })
}

util.inherits(EnvironmentalService, BlenoPrimaryService)

module.exports = EnvironmentalService
