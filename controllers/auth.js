const login = async (req) => {
  const result = await req
  console.log(result)
  return new Response('login request')
}

const logout = (req) => {
  return new Response('logout request')
}

export { login, logout }
