class XmlApiAdapter {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async getBooksByAuthor(authorName, limit) {
    return new Promise((resolve, reject) => {
      // XHR stuff
      var req = new XMLHttpRequest()
      req.open(
        'GET',
        `${this.baseUrl}by-author?q=${authorName}&limit=${limit}&format=xml`
      )

      req.onload = () => {
        // 'this' is referring to the XMLHttpRequest in this onload func
        if (req.status === 200) {
          resolve(this._parseXmlResponse(req.responseXML))
        } else {
          reject(Error(req.statusText))
        }
      }

      req.onerror = () => {
        reject(Error('Network Errors'))
      }

      req.send()
    })
  }

  _parseXmlResponse(xml) {
    let result = []

    result = xml.documentElement.childNodes.map((item) => ({
      title: item.childNodes[0].childNodes[0].nodeValue,
      author: item.childNodes[0].childNodes[1].nodeValue,
      isbn: item.childNodes[0].childNodes[2].nodeValue,
      quantity: item.childNodes[1].childNodes[0].nodeValue,
      price: item.childNodes[1].childNodes[1].nodeValue,
    }))

    return result
  }
}

module.exports = XmlApiAdapter
