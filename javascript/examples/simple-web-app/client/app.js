const persons = [];

function createPersonsTable() {
  const tbody = document.getElementById('persons-table-body');
  tbody.innerHTML = "";
  
  persons.forEach(person => {
    const tr = document.createElement('tr');
    tr.appendChild(getTableDataNode(person.firstName));
    tr.appendChild(getTableDataNode(person.lastName));
    tr.appendChild(getTableDataNode(person.age));
    tr.appendChild(getDeletePersonButton(person.id));
    tbody.appendChild(tr);
  });
}

function getTableDataNode(innerText) {
  const td = document.createElement('td');
  td.appendChild(document.createTextNode(innerText));
  return td;
}

function getDeletePersonButton(id) {
  const button = document.createElement('button');
  button.className = "btn btn-danger";
  button.id = id;
  
  button.onclick = function() {
    deletePersonById(button.id);
  }

  button.innerText = "Delete";

  const td = document.createElement('td');
  td.appendChild(button);

  return td;
}

async function addPerson() {
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const ageInput = document.getElementById('age');

  try {
    await axios.post('http://localhost:3000/api/v1/example/addPerson', {
      firstName: firstNameInput.value, 
      lastName: lastNameInput.value, 
      age: ageInput.value
    });
    load();
    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
  } catch (err) {
    console.error(err);
  }
}

async function deletePersonById(id) {
  try {
    await axios.post('http://localhost:3000/api/v1/example/deletePersonById', { id })
    load();
  } catch (err) {
    console.error(err);
  }
}

async function load() {
  try {
    const allPersons = await axios.get('http://localhost:3000/api/v1/example/allPersons');
    persons.length = 0;
    persons.push.apply(persons, allPersons.data);
    createPersonsTable();
  } catch (errors) {
    console.error(errors);
  }
}

async function reload() {
  try {
    await axios.get('http://localhost:3000/api/v1/example/reload');
    load();
  } catch (err) {
    console.error(err);
  }
}

load();
