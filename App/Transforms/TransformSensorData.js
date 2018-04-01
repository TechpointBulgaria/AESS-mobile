export default sensorData =>
  sensorData.map(({ createdAt, value }, i) => ({
    x: i, //createdAt,
    y: value
  }))
