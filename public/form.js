// Form add ingredients button
const addIngredientButton = document.getElementById('add-ingredient')
const ingredientInputContainer = document.getElementById('ingredient-input')
const amountInputContainer = document.getElementById('amount-input')

function addIngredientInput() {
  const newInput = document.createElement('input')
  newInput.setAttribute('type', 'text')
  newInput.setAttribute('name', 'ingredient[]')
  newInput.setAttribute('value', '')
  ingredientInputContainer.appendChild(newInput)
}

function addAmountInput() {
  const newInput = document.createElement('input')
  newInput.setAttribute('type', 'text')
  newInput.setAttribute('name', 'amount[]')
  newInput.setAttribute('value', '')
  amountInputContainer.appendChild(newInput)
}

function combineTwo() {
  addIngredientInput()
  addAmountInput()
}

addIngredientButton.addEventListener('click', combineTwo)
