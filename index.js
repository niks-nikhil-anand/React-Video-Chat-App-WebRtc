const app = require("express")()
const server =  require("http").createServer(app)
const cors = require("cors")

const io = require("socket.io" , {
    cors :{
        origin : "*" ,
        methods : ["GET" , "POST"]
    }
})

app.use(cors())

const PORT = process.env.port || 3000

app.get("/" , (req,res) =>{
    res.send("Server is running")
})

server.listen(PORT , () => console.log(`server is listening on port ${PORT}`))

