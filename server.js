const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.listen(port, () => {console.log(`App listening on port ${port}`)})

app.get('/', (req, res) => {res.send('Hello World!')})

/* ---------------------- Exercise 1 ---------------------- */

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello, my name is Inigo Montoya. You killed my father, ${req.params.username}. Prepare to die.`)
})

/* ---------------------- Exercise 2 ---------------------- */

app.get('/roll/:number', (req, res) => {
    const num = req.params.number
    if (isNaN(num)) res.send('You must specify a number.')
    else res.send(Math.floor(Math.random() * num))
})

/* ---------------------- Exercise 3 ---------------------- */

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:idx', (req, res) => {
    const idx = req.params.idx
    if (isNaN(idx)) res.send('This is not an existing index in our collection.')
    else if (idx < collectibles.length && !isNaN(idx)) res.send(`You have selected the ${collectibles[idx].name}. For $${collectibles[idx].price}, it's all yours.`)
    else res.send('This item is not yet in stock. Check back soon.')
})

/* ---------------------- Exercise 4 ---------------------- */

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

app.get('/shoes', (req, res) => {
    if (req.query.type) {
        const shoeTypes = shoes.filter(shoe => shoe.type === req.query.type)
        shoeTypes.length > 0 ? res.send(shoeTypes) : res.send('We do not have this type of shoe.')
    }
    else if (req.query.minprice) {
        const shoesAboveMinPrice = shoes.filter(shoe => shoe.price >= req.query.minprice)
        shoesAboveMinPrice.length > 0 ? res.send(shoesAboveMinPrice) : res.send(`No shoes with a mininum price of ${req.query.minprice}.`)
    }
    else if (req.query.maxprice) {
        const shoesUnderMaxPrice = shoes.filter(shoe => shoe.price <= req.query.maxprice)
        shoesUnderMaxPrice.length > 0 ? res.send(shoesUnderMaxPrice) : res.send(`No shoes under a maximum price of ${req.query.maxprice}.`)
    }
    else {
        res.send(shoes)
    }
})
