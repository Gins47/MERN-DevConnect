const express = require('express')

const app = express()

const connect = require('./config/db')

connect()
app.use(express.json({extended:false}))

app.get('/',(req,res)=>res.send('API Running'))

app.use('/api/users',require('./router/api/user'))
app.use('/api/post',require('./router/api/post'))
app.use('/api/profile',require('./router/api/profile'))
app.use('/api/auth',require('./router/api/auth'))

const PORT  = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server started on the port ${PORT}`) )