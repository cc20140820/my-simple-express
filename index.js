import url from "url"
import path from "path"
import fs from "fs"
import express from "express"

const { fileURLToPath } = url

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = 3000
const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  const urlObject = url.parse(req.url)
  const { pathname } = urlObject
  console.log(`request path: ${pathname}`)
  next()
})

app.get("/api/users", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify([{ name: "sam" }]))
})

app.post("/api/users", (req, res) => {
  let postData = ""
  req.on("data", (chunk) => {
    postData += chunk
  })
  req.on("end", () => {
    fs.appendFile(path.join(__dirname, "db.txt"), postData, () => {
      res.end(postData)
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`)
})
