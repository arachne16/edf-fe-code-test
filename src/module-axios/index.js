const JsonApiAdapter = require('./JsonApiAdapter')
const XmlApiAdapter = require('./XmlApiAdapter')

// to -> class structure
class BookSearchApiClient {
  constructor(baseUrl, format) {
    this.baseUrl = baseUrl
    this.adapter = this._selectAdapter(format)
  }

  // select adapter base on `format`
  _selectAdapter(format) {
    if (format === 'json') {
      return new JsonApiAdapter(this.baseUrl)
    } else if (format === 'xml') {
      return new XmlApiAdapter(this.baseUrl)
    } else {
      throw new Error(`Format ${format} is not supported.`)
    }
  }

  getBooksByAuthor(authorName, limit) {
    return this.adapter.getBooksByAuthor(authorName, limit)
  }
}

module.exports = BookSearchApiClient
