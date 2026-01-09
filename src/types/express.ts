import { JwtPayload } from "../config/jwt"

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

// This file ensures the type augmentation is loaded
export {}

