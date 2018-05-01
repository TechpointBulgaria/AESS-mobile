export default ({ result }) => ({
  result: result.map(room => ({
    ...room,
    devices: room.devices.map(device => ({
      ...device,
      state: device.state ? Number(device.state).toFixed(0) : 0
    }))
  }))
})
