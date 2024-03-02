const connectWithMongo = require('./db')
const express = require("express")

//node ./node_modules/nodemon/bin/nodemon.js index 
connectWithMongo();

const app = express()
const port = 5000
// app.get('/', (req, res) => {
//     res.send('Hello Mohan')
// })
//used for connecting routes 
app.use(express.json())
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))

app.listen(port, () => {
    console.log(`i-NoteBook Backend app listening at http://localhost:${port}`)
})

