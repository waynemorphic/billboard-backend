import express from 'express'
import * as fs from 'fs'

// read db.json and parse as json file
let rawData = fs.readFileSync("db.json")
let clientData = JSON.parse(rawData)

// port
const PORT = 3002

// get method to use in front end for axios
const app = express()


// proxy for CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
});

// endpoint for axios and useEffect hook
app.get("/transactions", (request, response) => {
    response.status(200)
    response.send(clientData)
    response.end()
})

// port listen
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

// running localhost/3002/transactions -> we expect to view all the data from db.json file