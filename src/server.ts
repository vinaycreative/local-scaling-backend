import app from "@/app"
import { env } from "@/config/env"

const PORT = parseInt(env.PORT)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
