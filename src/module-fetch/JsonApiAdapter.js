class JsonApiAdapter {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async getBooksByAuthor(authorName, limit) {
    const response = await fetch(
      `${this.baseUrl}/by-author?q=${authorName}&limit=${limit}&format=json`
    )

    if (!response.ok) {
      throw new Error(`Request failed. Returned status of ${response.status}`)
    }

    const books = await response.json()

    return books.map(this._transformBook)
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
