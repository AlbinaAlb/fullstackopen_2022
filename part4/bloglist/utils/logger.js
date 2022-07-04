const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}
//внутри будут экспорты консоль логов для тестов
module.exports = { info, error }
