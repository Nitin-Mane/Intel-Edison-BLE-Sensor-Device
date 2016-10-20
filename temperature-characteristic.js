var util = require('util')
var bleno = require('bleno')
var bmpx8x = require('jsupm_bmpx8x')

var sensor = new bmpx8x.BMPX8X(6, bmpx8x.ADDR)
var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var TemperatureCharacteristic = function() {
  TemperatureCharacteristic.super_.call(this, {
    uuid: '2A6E',
    properties: ['read', 'notify'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Temperature value'
      })
    ]
  })

  this._latestTemp = null
  this._updateTemp = function(){
    var self = this
    self._latestTemp = Number(sensor.getTemperature())

    if (self._notify != null){
      var buffer = new Buffer(8)
      buffer.writeDoubleBE(self._latestTemp, 0)
      self._notify(buffer)
    }

    setTimeout(function(){
      self._updateTemp()
    }, 2000)
    console.log('Current temperature: ' + self._latestTemp + ' ⁰C')
  }

  this._notify = null
  this._updateTemp()
}

util.inherits(TemperatureCharacteristic, Characteristic)

TemperatureCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log("onReadRequest called")
  var buffer = new Buffer(8)
  buffer.writeDoubleBE(this._latestTemp, 0)
  callback(this.RESULT_SUCCESS, buffer)
}

TemperatureCharacteristic.prototype.onSubscribe = function(maxValueSize, callback) {
  console.log("onSubscribe called")
  this._notify = callback
}

TemperatureCharacteristic.prototype.onUnsubscribe = function() {
  console.log("onUnsubscribe called")
  this._notify = null
}

module.exports = TemperatureCharacteristic
