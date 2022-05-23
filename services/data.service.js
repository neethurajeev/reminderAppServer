// const res = require("express/lib/response")

// const req = require("express/lib/request")

// import db
const db = require('./db')

// import jwt
const jwt = require('jsonwebtoken')


database = {
    1: { userId: 1, uname: "a", pwd: 1, description: '' },
    2: { userId: 2, uname: "b", pwd: 2, description: '' },
}


// register

const register = (userId, uname, pwd) => {

    // asychronous

    return db.User.findOne({ userId })
        .then(user => {

            if (user) {
                // account already exist

                return {
                    statusCode: 404,
                    status: false,
                    message: "account already exist"

                }
            } else {

                const newUser = new db.User({

                    userId,
                    uname,
                    pwd,
                    records: [],
                })
                newUser.save()
                return {

                    statusCode: 201,
                    status: true,
                    message: "registration sucessfully  ....plz login"


                }
            }
        })

}


// login

const login = (userId, pwd) => {

    return db.User.findOne({ userId, pwd })
        .then(user => {
            if (user) {

                currentUser = user.uname
                currentUserId = userId

                // token generation
                const token = jwt.sign({
                    currentUserId: userId
                }, 'kl08')

                return {
                    statusCode: 201,
                    status: true,
                    message: "login sucessfully",
                    token,
                    currentUserId,
                    currentUser

                }
            }else{
                return{
                    statusCode: 404,
                    status: false,
                    message: "invalid entry "

                }
            }
        })
}

// add event

const addEvent =(userId, date,events)=>{

    var date = date;
    date = date.split("-").reverse().join("-");

    return db.User.findOne({userId})
    .then(result=>{


        if (result) {
            result.records.push({
                date,
                events
            })
            result.save()

            return{
                statusCode: 201,
                status: true,
                message: "Added events" 
            }

        }else{
            return{
                statusCode: 404,
                status: false,
                message: "please login again "

            }
        }
    })
    
}



 // viewDetails 

 const viewDetails=(userId)=>{

    return db.User.findOne({userId})

    .then(result=>{


        if (result) {
            return{
                statusCode: 201,
                status: true,
                records:result.records
            }

        }else{
            return{
                statusCode: 404,
                status: false,
                message: "please login again "

            }
        }
    })
}
 

 // delete

 const deleteAcc=(userId)=>{

    return db.User.deleteOne({userId})
    .then(user=>{

        if (!user) {
            return {
                statusCode: 401,
                status: false,
                message: "operation failed !!!"
            }
        }else{
            return {
                statusCode: 200,
                status: true,
                message: "Account deleted Sucessfully.."
            }
        }
    })
}
 

// export
module.exports = {
    register, login ,addEvent ,viewDetails ,deleteAcc
}