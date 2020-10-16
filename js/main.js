const employees = [
    {"imie": "Jan", "nazwisko": "Kowalski", "dzial": "IT", "wynagrodzenieKwota": "3000", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Anna", "nazwisko": "Bąk", "dzial": "Administracja", "wynagrodzenieKwota": "2400.50", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Paweł", "nazwisko": "Zabłocki", "dzial": "IT", "wynagrodzenieKwota": "3300", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Tomasz", "nazwisko": "Osiecki", "dzial": "Administracja", "wynagrodzenieKwota": "2100", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Iwona", "nazwisko": "Leihs-Gutowska", "dzial": "Handlowiec", "wynagrodzenieKwota": "3100", "wynagrodzenieWaluta": "PLN"},
]

//unique values of employee.dzial from employees
const tbody = document.querySelector('#table-body');
const employeesDeps = employees.map(employee => {
    return employee.dzial;
});
let set = new Set(employeesDeps);
let departments = [...set];

const generateEmployeesTable = _ => {
    for (const employee of employees) {
        const template = `
                <tr class="employee">
                    <td class="employee-name">${employee.imie}</td>
                    <td class="employee-name">${employee.nazwisko}</td>
                    <td class="employee-dep">${employee.dzial}</td>
                    <td class="employee-salary">${employee.wynagrodzenieKwota}</td>
                    <td>${employee.wynagrodzenieWaluta}</td>
                </tr>
        `
        tbody.innerHTML += template;
    }
}

const selects = document.querySelectorAll('.select-department');
const generateDepartmentSelect = _ => {
    selects.forEach(select => {
        let department;
        for (let i = 0; i < departments.length; i++) {
            department = document.createElement('option');
            department.classList.add('option');
            department.text = departments[i];
            department.value = departments[i];
            select.add(department);
        }
    })
}

const resultDep = document.querySelector('.departments-salary');
let sumDep;
const showDepartmentSalary = e => {
    // const resultDep = document.querySelector('.departments-salary');
    const deps = [...document.querySelectorAll('.employee-dep')];
    sumDep = 0;
    deps.filter(el => {
        if (el.innerText === e.target.value) {
            const parent = el.parentNode;
            const salary = parent.querySelector('.employee-salary');
            sumDep += parseFloat(salary.textContent);
        }
    });
    resultDep.textContent = sumDep;
}

const showAllSalary = _ => {
    const resultAll  = document.querySelector('.salary-sum');
    const salaryAll = [...document.querySelectorAll('.employee-salary')];
    sumAll = 0;
    for (const sal of salaryAll) {
        sumAll += parseFloat(sal.textContent);
    }
    resultAll.textContent = sumAll;
}

const searchEmployee = e => {
    const input = e.target.value.toLowerCase();
    const elems = tbody.querySelectorAll('.employee');
    elems.forEach(el => {
        const names = el.querySelectorAll('.employee-name');
        const name = names[0].textContent.toLowerCase().indexOf(input);
        const surname = names[1].textContent.toLowerCase().indexOf(input);
        if (name !== -1 || surname !== -1 ) {
            el.style.setProperty('display', '');
        } else {
            el.style.setProperty('display', 'none');
        }
    });
}

const selectDep = document.querySelector('#selectDep');
const filterDepartments = _ => {
    const deps = [...document.querySelectorAll('.employee-dep')];
    const option = selectDep.value;
    deps.filter(el => {
        if (el.innerText !== option) {
            el.parentNode.style.setProperty('display', 'none');
        } else {
            el.parentNode.style.setProperty('display', '')
        }
    });
}

const filterSalary = e => {
    const min = parseFloat(document.querySelector('#salaryFrom').value);
    const max = parseFloat(document.querySelector('#salaryTo').value);
    const salaryAll = [...document.querySelectorAll('.employee-salary')];

    salaryAll.filter(el => {
        if (parseFloat(el.textContent) >= min && parseFloat(el.textContent) <= max) {
            el.parentNode.style.setProperty('display', '');
        } else {
            el.parentNode.style.setProperty('display', 'none')
        }
    });
}

const clearAndAddNewSelects = department => {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.remove();
    })
    departments.push(department);
    const set = new Set(departments);
    departments = [...set];
    generateDepartmentSelect();
}

const addEmployee = e => {
    e.preventDefault();
    const name = document.querySelector('#nameToAdd').value;
    if (name === '') return alert('Wypełnij wszystkie pola prawidłowo');
    const surname = document.querySelector('#surnameToAdd').value;
    if (surname === '') return alert('Wypełnij wszystkie pola prawidłowo');
    const department = document.querySelector('#departmentToAdd').value;
    if (department === '') return alert('Wypełnij wszystkie pola prawidłowo');
    const salary = document.querySelector('#salaryToAdd').value;
    if (salary === '') return alert('Wypełnij wszystkie pola prawidłowo');

    clearAndAddNewSelects(department);

    const template = `
                    <td class="employee-name">${name}</td>
                    <td class="employee-name">${surname}</td>
                    <td class="employee-dep">${department}</td>
                    <td class="employee-salary">${salary}</td>
                    <td>PLN</td>
    `
    const tr = document.createElement('tr');
    tr.classList.add('employee');
    tr.innerHTML = template;
    tbody.appendChild(tr);

    //update salary sum
    showAllSalary();

    //clear showDepartmentSalary()
    selectDepSalary.value = "all";
    resultDep.textContent = '';
}

//generate table
generateEmployeesTable();

//generate selects
generateDepartmentSelect();

//generate salary departmens
const selectDepSalary = document.querySelector('#selectDepSalary');
selectDepSalary.addEventListener('change', showDepartmentSalary);
showAllSalary();

//search employee
const searchEmployeeInput = document.querySelector('#searchEmployee');
searchEmployeeInput.addEventListener('input', searchEmployee);

//search department
selectDep.addEventListener('change', filterDepartments);

//reset button
document.querySelector('#btnReset').addEventListener('click', e => {
    const deps = [...document.querySelectorAll('.employee-dep')];
    e.preventDefault();
    deps.forEach(el => el.parentNode.style.setProperty('display', ''));
    selectDep.value = "all";
});

//filter salary
const containerFromTo = document.querySelector('.from-to-container');
containerFromTo.addEventListener('input', filterSalary);

//add employee
document.querySelector('#addBtn').addEventListener('click', addEmployee);
