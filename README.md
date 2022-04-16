## API details

Route                                        | Description
---------------------------------------------|------------------------------------
GET    /api/                                 | Get server info
POST   /api/accounts/                        | Create an account, ex: `{ user: 'me', description: 'My budget', currency: '$', balance: 1000 }`
GET    /api/accounts/:user                   | Get all data for the specified account
DELETE /api/accounts/:user                   | Remove specified account
POST   /api/accounts/:user/transactions      | Add a transaction, ex: `{ date: '2022-04-22', object: 'Bought a book', amount: -30 }`
DELETE  /api/accounts/:user/transactions/:id | Remove specified transaction, you need a id transaction

