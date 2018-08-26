import jwt from "jsonwebtoken"

const INSECURE_KEY = "insecure-key"
const DEFAULT_EXPIRATION = 60 * 60 * 24 * 365
const JWT_SECRET = process.env.JWT_SECRET || INSECURE_KEY

export default class jwtToken {
  static authorize(roles) {
    return async function (req, res, next) {

      // Get auth header
      let authHeader = req.header("Authorization")
      if (authHeader == null) {
        console.log("No auth header provided")
        // No auth header provided
        return res.status(401).json({
          type: "No auth header provided",
        })
      }

      // Parse header
      let parts = authHeader.split(" ")
      if (parts.length !== 2 || parts[0] !== "Bearer") {
        console.log("Auth header is malformed")
        // Auth header is malformed
        return res.status(401).json({
          type: "Auth header is malformed",
        })
      }

      // Decode token
      let token = parts[1]
      let decoded

      try {
        decoded = jwt.verify(token, JWT_SECRET)
      } catch (err) {
        console.log(err)
        // Token is invalid
        return res.status(401).json({
          type: "token_invalid",
        })
      }

      // Parse role
      let role = decoded.userRole
      console.log(role, " logged in")

      // check if role permitted
      if (roles.indexOf(role) === -1) {
        return res.status(401).json({
          type: "Unauthorized",
        })
      }

      // Everything checks out
      req.authClaims = decoded
      next()
    }
  }
}

function signToken(user) {
  return jwt.sign({
      userID:   user.id,
      userRole: user.role,
      userName: user.username,
    },
    JWT_SECRET, { expiresIn: DEFAULT_EXPIRATION },
  )
}

export { signToken }
