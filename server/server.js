import * as Path from 'node:path'
// import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'

import * as lib from './lib.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here

// add get route for home
server.get('/', async (req, res) => {
  const recipesobj = await lib.readRecipes()
  const recipes = recipesobj.recipes
  res.render('home', { recipes })
})

// add get route for individual recipes

server.get('/recipes/:id', async (req, res) => {
  const recipe = await lib.getRecipeById(Number(req.params.id))
  res.render('details', recipe)
})

// add get route for add recipe page
server.get('/add-recipe', (req, res) => {
  res.render('add')
})

// add post route for new recipes
server.post('/add-recipe', async (req, res) => {
  const data = await lib.readRecipes()

  const newRecipe = {
    id: data.recipes.length + 1,
    name: req.body.name,
    author: req.body.author,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  }

  data.recipes.push(newRecipe)

  await lib.writeRecipes(data)

  res.redirect('/')
})

// add post route for edits

export default server
