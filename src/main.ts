import { createProxyServer, ServerOptions } from 'http-proxy'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import * as connect from 'connect'
import * as config from './contribjs.config'

// Properties that should be read from configuration file
const proxyOptions: ServerOptions = {

}
const PROXY_PORT: number = 8008
const proxy = createProxyServer(proxyOptions)

const app = connect()

// Filter requests before forwarding them to origin server
app.use((req: IncomingMessage, res: ServerResponse, next: Function) => {
    console.log('before: ' + res.getHeaderNames())
    next()
})

// Forward requests to origin server
app.use((req: IncomingMessage, res: ServerResponse, next: Function) => {
    proxy.web(req, res, {target: 'http://127.0.0.1:8080'})
})

// May be used for logging and caching reasons (no response manipulation)
proxy.on('proxyRes', (proxyRes, req, res) => {
    console.log('Hi')
})

app.listen(PROXY_PORT)

// const server = createServer((req, res) => {
//     console.log('Received request from the world')
//     proxy.web(req, res, {target: 'http://127.0.0.1:8080'})
// })
proxy.on('proxyReq', (req, res) => {
    console.log('Request being forwarded to origin server')
})
// proxy.on('proxyRes', (req, res) => {
//     console.log('Received response from origin server')
// })

// console.log('ContribJS reverse proxy running on port: ' + PROXY_PORT)
// server.listen(PROXY_PORT)
