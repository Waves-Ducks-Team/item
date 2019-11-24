import * as Debug from 'debug'
import * as http from 'http'
import { handlingFailedParams, initProcessTxs } from './txs'
import config from './config'

const debug = Debug('combine')

debug('🚜 Combine is starting...')

// Worker
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'UP' }))
})

const run = async () => {
  handlingFailedParams()
  initProcessTxs()
}

run().then(() => {
  server.listen(config.port, () => {
    debug(`💉 Healthcheck running at ${config.port} port`)
  })
})
