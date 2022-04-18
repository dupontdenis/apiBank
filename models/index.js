// Store data in-memory, not suited for production use!
const db = {
    dupont: {
      user: 'dupont',
      description: `Test account`,
      balance: 10000,
      transactions: [
        { id: '2', date: '2022-04-25', object: 'Book', amount: -10 },
        { id: '1', date: '2022-04-25', object: 'Book', amount: -50 },
        { id: '3', date: '2022-04-25', object: 'MacDO', amount: -15 }
      ],
    }
  };

module.exports = db;