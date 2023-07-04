const form = document.getElementById('form');
const formBody = document.querySelector('#formBody');
function formInput(props, index) {
    if (props.type === 'select') {
        return formSelect(props, index)
    }
    return `<div>
                <label>${props.label}</label>
                    <input class="input-custom" 
                    type="${props.type || 'text'}" name="${props.name}" 
                    onblur="onFocus(${index})" 
                    ${props.pattern ? `pattern=${props.pattern}` : ""} 
                    value="${props.value}"
                    required=${props.require || false} /></br>
                <span class="error">${props.message}</span>
            </div>`
}
function formSelect(props, index) {
    let optionsStr = "";
    props.options.forEach(e => {
        optionsStr += `<option value="${e.value}">${e.name}</option>`;
    })

    return `<div>
                <label>${props.label}</label>
                    <select class="input-custom" 
                    type="${props.type || 'text'}" name="${props.name}" 
                    onblur="onFocus(${index})" 
                    ${props.pattern ? `pattern=${props.pattern}` : ""} 
                    value="${props.value}"
                    required=${props.require || false}>
                        <option value>---Choose---</option>
                        ${optionsStr}
                    </select>
                    </br>
                    <span class="error">${props.message}</span>
            </div>`
}
const onFocus = (index) => {
    const inputsForm = document.querySelectorAll('#formBody .input-custom')
    inputsForm[index].setAttribute("focused", "true");
}


const inputs = [
    {
        label: "Username",
        name: "username",
        pattern: "^[A-Za-z]{6,20}",
        message: "Username must have minimun is 6 charaters and maximun is 20 charaters",
        require: true,
        value: ""
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        message: "Email invalid",
        require: true,
        value: ""
    },
    {
        label: "Gender",
        name: "gender",
        type: "select",
        message: "Email invalid",
        require: true,
        options: [{ value: 1, name: 'Male' }, { value: 2, name: 'Female' }]
    }
]
function renderForm() {
    formBody.innerHTML = "";
    inputs.forEach((input, index) => {
        formBody.innerHTML += formInput(input, index);
    })
}

function getDataFromForm() {
    const data = new FormData(form);
    return Object.fromEntries(data.entries())
}
document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
        e.target.onblur();
    };
})(), true);
renderForm();

