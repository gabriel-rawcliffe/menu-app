// // Form add ingredients button
const addIngredientButton = document.getElementById('add-ingredient')
const ingredientInputs = document.querySelector('.ingredient-inputs')

let ingredientCounter = 1

addIngredientButton.addEventListener('click', () => {
  const newIngredientInput = document.createElement('div')
  newIngredientInput.innerHTML = `
    <label for="ingredient${ingredientCounter + 1}" class="form-item">
      Ingredient ${ingredientCounter + 1}:
      <input type="text" name="ingredients[${ingredientCounter}].ingredient" value="">
      Amount:
      <input type="text" name="ingredients[${ingredientCounter}].amount" value="">
    </label>
  `
  ingredientInputs.appendChild(newIngredientInput)
  ingredientCounter++
})

// instructions add button

const addInstructionButton = document.getElementById('add-instruction')
const instructionInputs = document.getElementById('instruct')
console.log(instructionInputs)
let instructionCounter = 1

addInstructionButton.addEventListener('click', () => {
  console.log('clicked')
  const newInstructionInput = document.createElement('div')
  newInstructionInput.innerHTML = `
    <label for="instruction${instructionCounter + 1}" class="form-item">
      Step ${instructionCounter + 1}:
      <input type="text" name="instructions[${instructionCounter}]" value="">
    </label>
  `
  instructionInputs.appendChild(newInstructionInput)
  instructionCounter++
})

// Add array elements for instructions and ingredients
const recipeForm = document.getElementById('recipeForm')
recipeForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(recipeForm)
  const data = {}
  formData.forEach((value, key) => {
    if (key.includes('ingredients')) {
      const [index, property] = key.match(/\[(\d+)\]\.(\w+)/).slice(1)
      if (!data.ingredients) data.ingredients = []
      if (!data.ingredients[index]) data.ingredients[index] = {}
      data.ingredients[index][property] = value
    } else if (key.includes('instructions')) {
      const index = key.match(/\[(\d+)\]/)[1]
      if (!data.instructions) data.instructions = []
      data.instructions[index] = value
    } else {
      data[key] = value
    }
  })

  try {
    const response = await fetch(recipeForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to add the recipe.')
    }
    window.location.href = '/'
    // Handle successful response (e.g., redirect to home page)
  } catch (error) {
    // Handle error response
    console.error(error.message)
  }
})
