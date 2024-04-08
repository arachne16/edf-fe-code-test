const axios = require('axios')

class JsonApiAdapter {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async getBooksByAuthor(authorName, limit) {
    const response = await axios.get(`${this.baseUrl}/by-author`, {
      params: { q: authorName, limit: limit, format: 'json' },
    })

    return response.data.map(this._transformBook)
  }

  async getBooksByPublisher(publisherName, limit) {
    // throw new Error('Method not implemented.')
  }

  async getBooksByYear(year, limit) {
    // throw new Error("Method not implemented.");
  }

  // convert response into standard format
  _transformBook(item) {
    return {
      title: item.book.title,
      author: item.book.author,
      isbn: item.book.isbn,
      quantity: item.stock.quantity,
      price: item.stock.price,
    }
  }
}

module.exports = JsonApiAdapter
