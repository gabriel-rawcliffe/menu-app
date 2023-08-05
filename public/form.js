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
// const addIngredientButton = document.getElementById('add-ingredient')
// const ingredientInputContainer = document.getElementById('ingredient-input')
// const amountInputContainer = document.getElementById('amount-input')

// function addIngredientInput() {
//   const newInput = document.createElement('input')
//   newInput.setAttribute('type', 'text')
//   newInput.setAttribute('name', 'ingredient[]')
//   newInput.setAttribute('value', '')
//   ingredientInputContainer.appendChild(newInput)
// }

// function addAmountInput() {
//   const newInput = document.createElement('input')
//   newInput.setAttribute('type', 'text')
//   newInput.setAttribute('name', 'amount[]')
//   newInput.setAttribute('value', '')
//   amountInputContainer.appendChild(newInput)
// }

// function combineTwo() {
//   addIngredientInput()
//   addAmountInput()
// }

// addIngredientButton.addEventListener('click', combineTwo)
