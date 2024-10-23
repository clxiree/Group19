const apiKey = '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'; 

const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}


async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)  
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.content

        if(data.choices[0].message.content) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    }
    catch (error){
        console.error(error)
    }
}


submitButton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput);