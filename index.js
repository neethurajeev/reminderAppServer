
// server creation

// import express
const express = require('express')
// const { json } = require('express/lib/response')
// const res = require('express/lib/response')


// import cors
const cors= require('cors')


// import dataservice
const dataservice = require('./services/data.service')
const res = require('express/lib/response')


// create server app using express
const app = express()


// to parse json
app.use(express.json())



// use cors
app.use(cors({
    origin: 'http://localhost:4200'
}))

// GET - to read data
app.get('/', (req, res) => {
    res.send("GET RESPONSE")
})

// post - to create data
app.post('/', (req, res) => {
    res.send("post RESPONSE")
})


// server

// register api call

app.post('/register', (req, res) => {
    dataservice.register(req.body.userId, req.body.uname, req.body.pwd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })

})

// login api call

app.post('/login',(req,res)=>{
    dataservice.login(req.body.userId, req.body.pwd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



// addEvent api call

app.post('/addEvent',(req,res)=>{

    dataservice.addEvent(req.body.userId, req.body.date, req.body.events )
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



// viewDetails api call

app.post('/viewDetails',(req,res)=>{
    dataservice.viewDetails(req.body.userId)
    .then(result=>{
        res.status(result.statusCode).json(result)
     })
})

// delete

app.delete('/deleteAcc/:userId',(req,res)=>{        
    dataservice.deleteAcc(req.params.userId)
    .then(result=>{
        res.status(result.statusCode).json(result)
        
    })
})


// define port number
app.listen(3000, () => {
    console.log("server started at 3000");
})