const url = window.location.href
const quizBox = document.getElementById('quiz-box')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')

$.ajax({
    type: "GET",
    url: `${url}data/`,
    success: function(response) {
        console.log(response);
        const data = response.data;

        data.forEach((el, index) => {
            for (const [question, answers] of Object.entries(el)) {
                quizBox.innerHTML += `
                <hr>
                <div class="mb-2">
                    <b>${question}</b>
                </div>
                `;

                answers.forEach(answer => {
                    quizBox.innerHTML += `
                        <div>
                            <input type="radio" class="ans"
                                id="${question}-${answer}"
                                name="${question}"
                                value="${answer}">
                            <label for="${question}-${answer}">${answer}</label>
                        </div>
                    `;
                });
            }
        });
    },
    error: function(error){
        console.log(error)
    }
});

const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')


const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el=>{
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type: "POST",
        url: `${url}save/`,
        data: data,
        success: function(response) {
            console.log("Full server response:", response);  // Debugging

            if (!response || !response.result) {
                console.error("Error: 'results' is missing from the response.");
                return;  // Stop execution if results is missing
            }

            const results = response.result;
            quizForm.classList.add('not-visible');

            scoreBox.innerHTML = `${response.passed ? 'Congratulations! ' : 'Oops... :( '} Your result is ${response.score}% `

            results.forEach(res => {
                const resDiv = document.createElement("div");
                for (const [question, resp] of Object.entries(res)) {
                    console.log(question);
                    console.log(resp);
                    console.log('*****');

                    resDiv.innerHTML += question
                    const cls = ['container', 'p-3', 'text-light', 'h3']
                    resDiv.classList.add(...cls)

                    if (resp=='not answered') {
                        resDiv.innerHTML += '-not answered'
                        resDiv.classList.add('bg-danger')
                    }
                    else{
                        const answer = resp['answered']
                        const correct = resp['correct_answer']

                        if (answer==correct){
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += `answered: ${answer}`
                        } else {
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += `| correct answer: ${correct}`
                            resDiv.innerHTML += `| answered: ${answer}`
                        }
                    }
                }
                //const resultsBox = document.getElementById('results-box');
                resultBox.append(resDiv);
            })
        },
        error: function(error) {
            console.log("AJAX Error:", error);
        }
    });
};

quizForm.addEventListener('submit', e=> {
    e.preventDefault();

    sendData();
});