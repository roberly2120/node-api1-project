// BUILD YOUR SERVER HERE
const express = require('express');
const Data = require('./users/model');

const server = express();
server.use(express.json())

server.get('/hello-world', (req, res) => {
    res.status(200).json({message: 'Hello World!!!'})
})

server.get('/api/users', async (req, res) => {
    Data.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting user information',
                err: err.message
            })
        })
})
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    Data.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: `user with id ${id} does not exist`
                })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'does not exist'
            })
        })
})


server.post('/api/users', async (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({
            message: 'provide name and bio'
        })
    } else {
        Data.insert(user)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(400).json({
                    message: 'could not create new user'
                })
            })
    }
})
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    Data.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: 'does not exist',
                })
            } else {
                res.status(200).json(user)
            }
        })
})
server.put('/api/users/:id', async (req , res) => {
    const { id } = req.params;
    const updatedUser = req.body
    if(!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({message: 'provide name and bio'})
    } else {
        Data.update(id, updatedUser)
            .then(user => {
                if(!user) {
                    res.status(404).json({message: 'does not exist'})
                } else {
                    const newUser = {
                        bio: updatedUser.bio,
                        id: id,
                        name: updatedUser.name,
                    }
                    console.log(newUser)
                    res.status(200).json(newUser)
                }
                
            })
        
    }
})






module.exports = server; // EXPORT YOUR SERVER instead of {}
