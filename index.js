const express = require("express")
const cors = require('cors')
const http = express()

http.use(cors())

let numbers = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: "123-456"
    },
    {
        id: 2,
        name: 'Ada Lovelance',
        number: "456-123"
    },
    {
        id: 3,
        name: 'Daniel Bernal',
        number: "300-16253"
    },
    {
        id: 4,
        name: 'Mary Moverick',
        number: "36-3829-3482"
    },
]

http.get('/', (request, response) =>{
    response.send(console.log(response.status))
})


http.get('/api/persons', (request, response) =>{
    response.send(numbers)
})

function getDate(){
    let date = new Date();
    return date
}

http.get('/api/info', (request, response) =>{

    const resp = [
        `<p>Phone books has info for ${numbers.length} people</p>`,
        `<p>${getDate()}</p>`
    ]

    response.send(resp.join('\n'))
})

http.get('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    const person = numbers.find(num => num.id === id)

    if(person){
        response.send(person)
    }else{
        response.status(401).end()
    }
})

http.delete('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    numbers = numbers.filter(person => person.id !== id)

    console.log(`Eliminado ${id}`)
    response.status(204)
})


//POST 
http.use(express.json());

function randomId(){
    return Math.floor(Math.random() * 10001); 
}

http.post('/api/persons', (request, response)=>{
    const body = request.body

    const newBody = {id: randomId(), ...body}
    numbers = numbers.concat(newBody)

    response.send(newBody)
})

const PORT = process.env.PORT || 3001
http.listen(PORT, ()=>{console.log(PORT)})