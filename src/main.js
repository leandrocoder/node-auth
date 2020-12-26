const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

require('./app/controllers/index')(app)

app.listen(PORT, () => {
    console.log(`REST API @ http://localhost:${PORT}/`)
})
