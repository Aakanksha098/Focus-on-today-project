const checkBoxList = document.querySelectorAll('.checkbox')
const inputField = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const labelStatement = document.querySelector('.label')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    }
}

let goalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${goalsCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${goalsCount}/3 completed`
if (goalsCount == 0) {
    labelStatement.innerText = "Raise the bar by completing your goals!"
}
else if (goalsCount == 1) {
    labelStatement.innerText = "Well begun is half done!"
}
else if (goalsCount == 2) {
    labelStatement.innerText = "Just a step away, keep going!"
}
else {
    labelStatement.innerText = "Great! you just completed all the goals..!"
}




checkBoxList.forEach((checkBox) => {
    checkBox.addEventListener('click', (e) => {
        const allFieldFill = [...inputField].every(function (input) {
            return input.value
        });

        if (allFieldFill) {
            checkBox.parentElement.classList.toggle('completed')

            const inputId = checkBox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            let goalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${goalsCount / 3 * 100}%`
            progressValue.firstElementChild.innerText = `${goalsCount}/3 completed`

            if (goalsCount == 0) {
                labelStatement.innerText = "Raise the bar by completing your goals!"
            }
            else if (goalsCount == 1) {
                labelStatement.innerText = "Well begun is half done!"
            }
            else if (goalsCount == 2) {
                labelStatement.innerText = "Just a step away, keep going!"
            }
            else {
                labelStatement.innerText = "Great! you just completed all the goals..!"
            }



            localStorage.setItem('allGoals', JSON.stringify(allGoals))

        }
        else {
            progressBar.classList.add('show-error')
        }
    })
})

inputField.forEach(input => {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })
    //no change in goals after tick in check
    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name = input.value
        localStorage.setItem('allGoals', JSON.stringify(allGoals))

    })
})







