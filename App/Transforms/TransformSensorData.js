import moment from 'moment'

export default sensorData =>
  sensorData
    .filter(s => !!s.value)
    .filter(s => s.value < 100) // api sometimes gives enormous values!
    .reverse()
    .map(({ value, to, type }, i) => ({
      x: i,
      y: parseInt(value),
      time: moment(to).format('HH:mm'),
      unit:
        {
          Temperature: '°C',
          Humidity: '%'
        }[type] || ''
    }))
