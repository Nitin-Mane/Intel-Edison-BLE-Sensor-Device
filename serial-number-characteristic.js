var util = require('util')
var bleno = require('bleno')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic
var macAddress = '<INSERT-SERIAL-NUMBER/MAC-ADDRESS>'

var SerialNumberCharacteristic = function() {
  SerialNumberCharacteristic.super_.call(this, {
    uuid: '2A25',
    properties: ['read'],
    value: macAddress,
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Get serial number of device'
      })
    ]
  })
}

util.inherits(SerialNumberCharacteristic, Characteristic)


SerialNumberCharacteristic.prototype.onReadRequest = function(offset, callback) {
  callback(this.RESULT_SUCCESS, new Buffer([macAddress]))
}

module.exports = SerialNumberCharacteristic
