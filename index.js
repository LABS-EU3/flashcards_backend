require('dotenv').config()

const app = require('./api/server')

const port = process.env.PORT

app.listen(port, () => console.log(`Listening on port ${port}`))