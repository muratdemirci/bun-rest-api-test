// The JS file is expected to be a standard Node.js module:

module.exports = {
  beforeRequestHandler(req, ctx, ee, next) {
    return next() // Must be called for the scenario to continue
  },
  afterResponseHandler(req, res, ctx, ee, next) {
    // console.log(`response body : ${res.body}`)
    return next() // Must be called for the scenario to continue
  },
  query(ctx, events, done) {
    // ctx.vars['query'] = 'foo' // set the "query" for the virtual user request
    return done()
  },
  parsePropertyToString(req, ctx, ee, next) {
    req.json.username = ctx.vars.username.toString()
    req.json.password = ctx.vars.password.toString()
    return next()
  },
}
