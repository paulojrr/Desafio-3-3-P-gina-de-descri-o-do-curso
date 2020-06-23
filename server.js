const express = require('express')
const nunjucks = require('nunjucks')
const cards = require('./cards')
const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true,
})

server.get('/', (req, res) => {
    return res.render('courses', { cards })
})

server.get('/about', (req, res) => {
    const about = {
        logo: "/img/logo.jpg",
        title: "RocketSeat",
        description: "Cursos online para você entrar com o pé direito nas tecnologias mais desejadas do mercado.",
        technologies: [
            { name: "Nodejs" },
            { name: "Reactjs" },
            { name: "React Native" }
        ],
        links: [
            { name: "Github" },
            { name: "instagram" },
            { name: "Facebook" }
        ],
    }

    return res.render('about', { about })
})

server.get('/:id', (req, res) => {
    const id = req.query.id

    const card = cards.find((card) => {
        return card.id == id 
    })

    if (!card) {
        return res.status(404).render('not-found')
    }
  
    return res.render('description', { card })
})

server.use((req, res) => {
    return res.status(404).render('not-found')
})

server.listen(5000, () => {
    console.log("Server running at port 5000")
})