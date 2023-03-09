import fetch from 'node-fetch'
import * as fs from 'fs/promises'
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = process.env.BASE_URL
const api_key = process.env.API_KEY

// setting headers
const requestHeaders = new Headers
requestHeaders.append('Authorization', 'Bearer ' + api_key)
requestHeaders.append('Content-Type', 'application/json; charset=utf-8');


// setting a timeout after 10 seconds
const controller = new AbortController();
const timeout = setTimeout(() => {
  controller.abort();
}, 5000);

// fetching data from blockonomics url wih set bearer auth
const response = await fetch(baseUrl,{
  signal: controller.signal,
  headers: requestHeaders,
  method: 'GET',
  body: null
})

// write response as json to db.json using promises file system
let body = await response.json()
body = JSON.stringify(body)
await fs.writeFile("db.json", body)



