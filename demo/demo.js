const express = require('express')
const app = express()
const PORT = 8080

// Server every file inside demo folder
app.use(express.static('./demo'))

console.log("Demo origin server running on port " + PORT + ".")
app.listen(PORT)