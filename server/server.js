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
const recipesobj= await lib.readRecipes()
const recipes = recipesobj.recipes
// add get route for home
server.get('/', (req, res) => {
  res.render('home', {recipes,})
})

// add get route for individual recipes

// add post route for new recipes

// add post route for edits

export default server
