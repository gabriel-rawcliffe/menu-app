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

export async function getRecipeById(id) {
  const recipesData = await readRecipes()
  const details = recipesData.recipes.find((recipe) => recipe.id === id)
  if (!details) {
    const error = new Error('Recipe not found')
    error.code = 404
    throw error
  }

  return details
}
