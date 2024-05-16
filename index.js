const url = require("url")
const path = require("path")
const fs = require("fs")
// const express = require("express")
const express = require("./myExpress/express")

const port = 3000

const resData = [
  {
    id: 1,
    name: "小明",
    age: 18,
  },
  {
    id: 2,
    name: "小红",
    age: 19,
  },
]

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
  res.end(JSON.stringify(resData))
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
