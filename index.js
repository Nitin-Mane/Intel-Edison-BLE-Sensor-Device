var bleno = require('bleno')
var EnvironmentalService = require('./environmental-service')
var DeviceService = require('./device-service')

var primaryService = new EnvironmentalService()
var deviceService = new DeviceService()

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state)

  if (state === 'poweredOn') {
    bleno.startAdvertising('Edison Device', [primaryService.uuid, deviceService.uuid])
  } else {
    bleno.stopAdvertising()
  }
})

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'))

  if (!error) {
    bleno.setServices([primaryService, deviceService], function(error){
      console.log('setServices: ' + (error ? 'error ' + error : 'success'))
    })
  }
})
