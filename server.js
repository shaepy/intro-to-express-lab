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
    // a function that takes 3 values, shoetype, minprice, and maxprice
    // sends back an array based on whether those were true or not
    // send the array with a check

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
    const shoeType = req.query.type ? req.query.type : null
    const minPrice = req.query["min-price"] ? Number(req.query["min-price"]) : null
    const maxPrice = req.query["max-price"] ? Number(req.query["max-price"]) : null

    if (!shoeType && !minPrice && !maxPrice) {
        res.send(shoes)
        return
    }

    let shoesByType, aboveMinPrice, belowMaxPrice, finalList
    let queryNullCount = 0
    const queryArray = [shoeType, minPrice, maxPrice]
    queryArray.forEach(q => {if (!q) queryNullCount += 1})

    if (queryNullCount < 2) {
        if (shoeType && minPrice && maxPrice) {
            shoesByType = shoes.filter(shoe => shoe.type === shoeType)
            aboveMinPrice = shoesByType.filter(shoe => shoe.price >= minPrice)
            finalList = aboveMinPrice.filter(shoe => shoe.price <= maxPrice)
        } else if (shoeType && minPrice && !maxPrice) {
            shoesByType = shoes.filter(shoe => shoe.type === shoeType)
            finalList = shoesByType.filter(shoe => shoe.price >= minPrice)
        } else if (shoeType && !minPrice && maxPrice) {
            shoesByType = shoes.filter(shoe => shoe.type === shoeType)
            finalList = shoesByType.filter(shoe => shoe.price <= maxPrice)
        } else if (!shoeType && minPrice && maxPrice) {
            aboveMinPrice = shoes.filter(shoe => shoe.price >= minPrice)
            finalList = aboveMinPrice.filter(shoe => shoe.price <= maxPrice)
        }
        finalList.length > 0 ? res.send(finalList) : res.send('Sorry, no matches found.')
    } else {
        const queryFilter = queryArray.find(q => q !== null)
        switch (queryFilter) {
            case shoeType:
                res.send(shoes.filter(shoe => shoe.type === shoeType))
                break
            case minPrice:
                res.send(shoes.filter(shoe => shoe.price >= minPrice))
                break
            case maxPrice:
                res.send(shoes.filter(shoe => shoe.price <= maxPrice))
                break
        }
    }
})