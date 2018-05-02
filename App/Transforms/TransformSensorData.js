export default sensorData =>
  sensorData.filter(_ => !!_.value).map(({ value }, i) => ({
    x: i, //createdAt,
    y: value
  }))
