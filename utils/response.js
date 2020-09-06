class Response {
  constructor(code, message, results) {
    (this.code = code),
      (this.message = message),
      (this.totalCountOfResults = results.length),
      (this.records = results);
  }
}

module.exports = Response;
