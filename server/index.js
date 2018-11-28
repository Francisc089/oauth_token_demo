const { syncAndSeed } = require('./db')
const app = require('./app')

app.listen(3000, () => console.log(`
  Listening on PORT 3000!
  http://localhost:3000/
`))

syncAndSeed()
  .then(() => console.log('Database is synced'));
