var util = require('util')
var bleno = require('bleno')
var SerialNumberCharacteristic = require('./serial-number-characteristic')
var BlenoPrimaryService = bleno.PrimaryService

function DeviceService() {
  DeviceService.super_.call(this, {
    uuid: '180A',
    characteristics: [
      new SerialNumberCharacteristic()
    ]
  })
}

util.inherits(DeviceService, BlenoPrimaryService)

module.exports = DeviceService
