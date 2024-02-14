const app = require("express")()
const server =  require("http").createServer(app)
const cors = require("cors")

const io = require("socket.io" , {
    cors :{
        origin : "*" ,
        methods : ["GET" , "POST"]
    }
})

// middleware
app.use(cors())

const PORT = process.env.port || 3000


app.get("/" , (_,res) =>{
    res.send("Server is running")
})

io.on('connection' , (socket)=>{
    socket.emit('me' , socket.id)
    socket.on('disconnect' , ()=>{
        socket.broadcast.emit("callEnded")
    })
    socket.on("calluser" , ({userToCall , signalData , from , name}) =>{
        io.to(userToCall).emit("calluser" , {signal :signal,from , name})
    })
    socket.on("answercall" , (data) =>{
        io.to(data.to).emit("callaccepted" , data.signal)
    })
})

server.listen(PORT , () => console.log(`server is listening on port ${PORT}`))



