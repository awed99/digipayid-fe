require('dotenv').config()
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const graphqlHeader = require('express-graphql-header')
const schemaData = require('./api/index.js')
const requestIp = require('request-ip')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const fs = require('fs')
const http = require('http')

// const JSONtoDBPrabayar = require('./jsons/json-to-db-prabayar')
// const JSONtoDBPascabayar = require('./jsons/json-to-db-pascabayar')

// Create the Express app
const app = express()
app.use(requestIp.mw())
app.use(cors())
app.use(express.static('images'))
app.use(
  '/',
  graphqlHeader,
  graphqlHTTP({
    schema: schemaData,
    graphiql: true,
    formatError(err) {
      let errors = null
      try {
        errors = JSON?.parse(err?.message)
      } catch {
        errors = err?.message
      }

      return {
        code: typeof errors === 'object' ? errors?.code : '99999',

        // message: (typeof errors === 'object') ? errors?.message : errors,
        message:
          typeof errors === 'object'
            ? errors?.message
            : errors.split(';')[0] === 'You have an error in your SQL syntax'
            ? 'Forbidden access!'
            : errors,
        locations: err.locations,
        path: err.path,
        customField: err.customField
      }
    }
  })
)

app.use('/upload', function (req, res) {
  res.send('Test URL Upload ')
})

app.listen(process.env.APP_PORT, () => {
  console.log('App run in port : ' + process.env.APP_PORT)
})

///////////// APP2 ///////////////////

const callbackVA = require('./apps/pg/callback-pg-va')

const app2 = express()
app2.use(requestIp.mw())
app2.use(cors())
app2.use('/images', express.static(__dirname + '/public/images'))
app2.post('/upload', cors(), function (req, res, next) {
  if (req.headers.authorization === 'Bearer ' + process.env.SECRET_KEY) {
    if (req.url == '/upload') {
      //Create an instance of the form object
      let form = new formidable.IncomingForm()

      //Process the file upload in Node
      form.parse(req, function (error, fields, file) {
        var oldpath = file.file.filepath
        var newpath = './public/images/' + fields.path + '/' + file.file.newFilename + '.png'
        var newpath2 = '/images/' + fields.path + '/' + file.file.newFilename + '.png'

        //Copy the uploaded file to a custom folder
        fs.rename(oldpath, newpath, function (err) {
          if (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(`{
                            "code": "00001",
                            "message": "Upload error or path is not valid!"
                        }`)
            res.end()

            return
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(`{
                            "code": "00000",
                            "message": "File uploaded!",
                            "data": "${newpath2}"
                        }`)
            res.end()
          }
        })
      })
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(`
        {
            "code": "00099",
            "message": "Authorization is not valid!"
        }
        `)
    res.end()

    return
  }
})

app2.post('/check-auth', cors(), (req, res) => {})

// app2.get('/json-to-db-prabayar', cors(), (req, res) => JSONtoDBPrabayar(req, res))
// app2.get('/json-to-db-pascabayar', cors(), (req, res) => JSONtoDBPascabayar(req, res))

app2.listen(process.env.APP2_PORT, () => {
  console.log('App run in port : ' + process.env.APP2_PORT)
})
