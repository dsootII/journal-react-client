const DEV_URL = "http://127.0.0.1:8000/api/"
const LIVE_URL = "https://journal-ten-jet.vercel.app/api/"

export const BACKEND_URL = LIVE_URL
export const ENDPOINTS = {
  //user
  signup: "signup/",
  login: "login/",
  userDetail: "user/",
  logout: "logout/",
  //containers
  listContainers: "listcontainers/",
  createContainers: "createcontainer/",
  deleteContainer: 'deletecontainer/',
  editContainer: (pk: number) => `editcontainer/${pk}/`,
  //tokens
  obtainTokens: "token/",
  refreshToken: 'token/refresh/',
  verifyToken: 'token/verify/',
  //entries
  createEntry: 'entries/'
}