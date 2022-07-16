import { App } from './src'

const app = new App()

app.use('GET', '/ping', (req) => {
  return new Response('PONG!')
})

app.use('POST', '/auth/login', (req) => {
  return new Response('POST login')
})

app.use('POST', '/auth/logout', (req) => {
  return new Response('POST logout')
})

app.useRoutes('auth')

app.serve(3000)
