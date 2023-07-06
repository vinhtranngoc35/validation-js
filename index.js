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
                    ${props.require ? 'required' : ''} /></br>
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
                    ${props.require ? 'required' : ''}>
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
        pattern: "^$|[A-Za-z]{6,20}",
        message: "Username must have minimun is 6 charaters and maximun is 20 charaters",
        require: false,
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
new DataTable('#example', {
    ajax: 'scripts/server_processing.php',
    processing: true,
    serverSide: true
});
// $(function () {
//     const dataGrid = $("#dataGrid").dxDataGrid({
//         dataSource: employees,
//         keyExpr: "EmployeeID",

//         columns: [
//             {
//                 dataField: "TitleOfCourtesy",
//                 // ...
//                 groupIndex: 0,
//             },
//             {
//                 dataField: "FullName",
//                 validationRules: [{ type: "required" }]
//             }, {
//                 dataField: "Position",
//                 validationRules: [{ type: "required" }]
//             }, {
//                 dataField: "BirthDate",
//                 dataType: "date",
//                 validationRules: [{ type: "required" }]
//             }, {
//                 dataField: "HireDate",
//                 dataType: "date",
//                 validationRules: [{ type: "required" }]
//             },
//             // ...
//             {
//                 dataField: "Country",
//                 cellTemplate: function (container, info) {
//                     console.log('template')
//                     const currentEmployeeData = info.data;
//                     container.append(
//                         $(`<div>Hello ${currentEmployeeData.FullName}</div>`)
//                     );
//                 }
//             },
//             {
//                 type: "buttons",
//                 buttons: ["edit", "delete", {
//                     text: "My Command",
//                     hint: "My Command",
//                     onClick: function (e) {
//                         console.log('demo')
//                     }
//                 }]
//             }
//             // ...
//         ],
//         selection: { mode: "single" },
//         onSelectionChanged: function (e) {
//             console.log('demo')
//             e.component.byKey(e.currentSelectedRowKeys[0]).done(employee => {
//                 if (employee) {
//                     $("#selected-employee").text(`Selected employee: ${employee.FullName}`);
//                 }
//             });
//         },
//         customizeColumns: function (columns) {
//             console.log(columns);
//         },
//         grouping: {
//             autoExpandAll: true,
//         },
//     });
// });

