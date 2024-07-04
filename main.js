let data = [];
let editIndex = -1;
let useremail = document.getElementById("email");
let userpassword = document.getElementById("password");
let emailerr = document.getElementById("emailerror");
let paserr = document.getElementById("passworderror");

function myfunction(event) {
  event.preventDefault();
  emailerr.innerHTML = "";
  paserr.innerHTML = "";

  let emailPattern = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-zA-Z]{2,20})$/;
  let upperCasePattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let specialCharacterPattern = /[~!@#%&()$^_?]/;
  let minlengthCharacterPattern = /^.{8,16}$/;

  let email = useremail.value;
  let password = userpassword.value;

  if (email === "") {
    emailerr.innerHTML = "Email is required";
  } else if (!emailPattern.test(email)) {
    emailerr.innerHTML = "Invalid email format";
    return;
  }

  if (password === "") {
    paserr.innerHTML = "Password is required";
    return;
  } else {
    if (!minlengthCharacterPattern.test(password)) {
      paserr.innerHTML += "Password must be between 8 and 16 characters <br>";
      return;
    } else if (!upperCasePattern.test(password)) {
      paserr.innerHTML += "At least 1 uppercase character <br>";
      return;
    } else if (!lowerCasePattern.test(password)) {
      paserr.innerHTML += "At least 1 lowercase character <br>";
      return;
    } else if (!numberPattern.test(password)) {
      paserr.innerHTML += "At least 1 number <br>";
      return;
    } else if (!specialCharacterPattern.test(password)) {
      paserr.innerHTML += "At least 1 special character <br>";
      return;
    }
  }

  let isDuplicate = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].email === email && i !== editIndex) {
      isDuplicate = true;
      break;
    }
  }

  if (isDuplicate) {
    emailerr.innerHTML = "Email already exists";
    return;
  }

  if (editIndex === -1) {
    createUser({ email, password });
  } else {
    updateUser(editIndex, { email, password });
    editIndex = -1;
  }

  document.getElementById("myform").reset();
}
function fetchData() {
  fetch("https://6683c44d56e7503d1ade07d4.mockapi.io/userData/userData")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data");
        
      }
    })
    .then((users) => {
      data = users;
      updateTable();
    })
    .catch((error) => console.error(error));
}

function createUser(user) {
  fetch("https://6683c44d56e7503d1ade07d4.mockapi.io/userData/userData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create user");
      }
    })
    .then((newUser) => {
      data.push(newUser);
      updateTable();
    })
    .catch((error) => console.error(error));
}

function updateUser(index, user) {
  fetch(`https://6683c44d56e7503d1ade07d4.mockapi.io/userData/userData`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update user");
      }
    })
    .then(() => {
      data[index] = user;
      updateTable();
    })
    .catch((error) => console.error(error));
}

function deleteRow(index) {
  fetch(`https://6683c44d56e7503d1ade07d4.mockapi.io/userData/userData`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        data.splice(index, 1);
        updateTable();
      } else {
        throw new Error("Failed to delete user");
      }
    })
    .catch((error) => console.error(error));
}

function updateTable() {
  let dataTable = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  dataTable.innerHTML = ""; 
  for (let i = 0; i < data.length; i++) {
    let newRow = dataTable.insertRow(dataTable.rows.length);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = data[i].email;
    cell3.innerHTML = data[i].password;
    cell4.innerHTML = `<button onclick="updateRow(${i})" style="padding:5px 15px;background-color:purple;color:white;font-size:20px;border-radius:5px">Update</button>
                       <button onclick="deleteRow(${i})" style="padding:5px 15px;background-color:Red;color:white;font-size:20px;border-radius:5px">Delete</button>`;
  }
}

function updateRow(index) {
  useremail.value = data[index].email;
  userpassword.value = data[index].password;
  editIndex = index;
}

document.addEventListener("DOMContentLoaded", fetchData);
