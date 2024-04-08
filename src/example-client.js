const BookSearchApiClient = require('./module-axios')

// APIs' url
const bookSellerUrl = 'http://api.book-seller-example.com'

// For JSON format
const clientJson = new BookSearchApiClient(bookSellerUrl, 'json')
clientJson
  .getBooksByAuthor('Shakespeare', 10)
  .then((books) => console.table('JSON Format:', books))
  .catch((error) => console.error(error))

// For XML format
const clientXml = new BookSearchApiClient(bookSellerUrl, 'xml')
clientXml
  .getBooksByAuthor('Shakespeare', 10)
  .then((books) => console.table('XML Format:', books))
  .catch((error) => console.error(error))
