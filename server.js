//import { createServer } from 'node:http'

//const server = createServer ((request, response) => {
    //response.write('Hello World')
        
        //return response.end()
     


//})

//server.listen(3333)

//POST : criação, usado quando quero criar um registro
//GET : uma alteração onde eu busco uma informação ex:listagens,detalhes
//PUT : para alteração
//DELETE : para apagar
// request body : toda vez que eu utilizo o método post e put, posso enviar um corpo para a requisição, onde enviamos os dados de um formulario por exemplo

import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()

const database = new DatabasePostgres()



server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    
    
    await database.create({
        title,
        description,
        duration,
        
    }) 


    return reply.status(201).send()
})

server.get('/videos', async (request) =>{
    const search = request.query.search
    
    const videos = await database.list(search)
    

    return videos
})

server.put('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})


// postgresql://video-node_owner:i7b2yGPUQsrx@ep-patient-pine-a5qabga8.us-east-2.aws.neon.tech/video-node?sslmode=require

// endpoint ep-nameless-bar-a50b6s8u

