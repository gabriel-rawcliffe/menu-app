import fs from 'node:fs/promises'
import * as Path from 'node:path'

export async function readRecipes() {
  try {
    return await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')

      .then((data) => JSON.parse(data))
  } catch (err) {
    console.error(err.message)
  }
}

export async function writeRecipes(data) {
  try {
    await fs.writeFile(
      Path.resolve('server/data/data.json'),
      JSON.stringify(data, null, 2)
    )
  } catch (err) {
    console.error(err.message)
  }
}

// Form button
const addIngredientButton = document.getElementById('add-ingredient')
const ingredientInputContainer = document.getElementById('ingredient-input')

function addIngredientInput() {
  const newInput = document.createElement('input')
  newInput.setAttribute('type', 'text')
  newInput.setAttribute('name', 'ingredient[]')
  newInput.setAttribute('value', '')
  ingredientInputContainer.appendChild(newInput)
}

addIngredientButton.addEventListener('click', addIngredientInput)
