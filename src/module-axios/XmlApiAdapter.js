const axios = require('axios')
const xml2js = require('xml2js') // to convert XML to JSON.

class XmlApiAdapter {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async getBooksByAuthor(authorName, limit) {
    const response = await axios.get(`${this.baseUrl}/by-author`, {
      params: { q: authorName, limit: limit, format: 'xml' },
    })

    // parse XML to JSON using xml2js
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: true,
    })
    const result = await parser.parseStringPromise(response.data)
    // console.log('result >> ', result)

    return result.books.map((item) => ({
      title: item.title,
      author: item.author,
      isbn: item.isbn,
      quantity: item.stock.quantity,
      price: item.stock.price,
    }))
  }
}

module.exports = XmlApiAdapter
