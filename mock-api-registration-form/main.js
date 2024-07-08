let data = [];
let editIndex = -1;
let username = document.getElementById("name");
let useremail = document.getElementById("email");
let userphonenumber = document.getElementById("phonenumber");
let userdob = document.getElementById("dateofbirth");
let usercity = document.getElementById("city");
let userpassword = document.getElementById("password");
let userconfirmpassword = document.getElementById("confirmpassword");
let nameerr = document.getElementById("nameerror");
let languageserr = document.getElementById("languageserror");
let gendererr = document.getElementById("gendererror");
let emailerr = document.getElementById("emailerror");
let phonenumbererr = document.getElementById("phonenumbererror");
let doberr = document.getElementById("dateofbirtherror");
let cityerr = document.getElementById("cityerror");
let passerr = document.getElementById("passworderror");
let confirmpasserr = document.getElementById("confirmpassworderror");

function myfunction(event) {
  event.preventDefault();
  nameerr.innerHTML = "";
  emailerr.innerHTML = "";
  passerr.innerHTML = "";
  doberr.innerHTML = "";
  phonenumbererr.innerHTML = "";
  gendererr.innerHTML = "";
  languageserr.innerHTML = "";
  cityerr.innerHTML = "";
  let namePattern = /^([a-zA-Z]{3,})$/
  let emailPattern =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-zA-Z]+).([a-zA-Z]{2,20})$/;
  let phonenumberpattern = /^([0-9]{10})$/;
  let upperCasePattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let specialCharacterPattern = /[~!@#%&()$^_?]/;
  let minlengthCharacterPattern = /^.{8,16}$/;
  let name = username.value;
  let email = useremail.value;
  let password = userpassword.value;
  let phonenumber = userphonenumber.value;
  let dob = userdob.value;
  let confirmpassword = userconfirmpassword.value;
  let usergender = document.querySelector('input[name="gender"]:checked');
  let userlanguages = document.querySelectorAll(
    'input[type="checkbox"]:checked').value;
  let city = usercity.value;
  if (name === "") {
    nameerr.innerHTML = "name is required";
  } else if (!namePattern.test(name)) {
    nameerr.innerHTML = "Name should be atleast three characters";
    return;
  }
  if (email === "") {
    emailerr.innerHTML = "Email is required";
  } else if (!emailPattern.test(email)) {
    emailerr.innerHTML = "Invalid email format";
    return;
  }
  if(dob === ""){
    doberr.innerHTML = "Date Of Birth is required";
  }
  if(phonenumber === ""){
    phonenumbererr.innerHTML = "Phone Number is required";
  }else if (!phonenumberpattern.test(phonenumber)){
    phonenumbererr.innerHTML = "Invalid phone number format";
  }
  if(!usergender){
    gendererr.innerHTML = "gender is required";
  }
  if(city === "")
    cityerr.innerHTML = "city is required";
  if(!userlanguages){
    languageserr.innerHTML = "languages are required";
  }
  if (confirmpassword === "") {
    confirmpasserr.innerHTML = "confirm password is required";
  } else if (confirmpassword !== password) {
    confirmpasserr.innerHTML =
      "check your confirm password and password should be same";
  }
  if (password === "") {
    passerr.innerHTML = "Password is required";
    return;
  } else {
    if (!minlengthCharacterPattern.test(password)) {
      passerr.innerHTML += "Password must be between 8 and 16 characters <br>";
      return;
    } else if (!upperCasePattern.test(password)) {
      passerr.innerHTML += "At least 1 uppercase character <br>";
      return;
    } else if (!lowerCasePattern.test(password)) {
      passerr.innerHTML += "At least 1 lowercase character <br>";
      return;
    } else if (!numberPattern.test(password)) {
      passerr.innerHTML += "At least 1 number <br>";
      return;
    } else if (!specialCharacterPattern.test(password)) {
      passerr.innerHTML += "At least 1 special character <br>";
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
    createUser({
      email,
      password,
      name,
      phonenumber,
      dateofbirth,
      gender,
      language,
      city
    });
  } else {
    updateUser(editIndex, {
      email,
      password,
      name,
      phonenumber,
      dateofbirth,
      gender,
      language,
      city
    });
    editIndex = -1;
  }

  document.getElementById("myform").reset();
}
function fetchData() {
  fetch("https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch the data");
      }
    })
    .then((users) => {
      data = users;
      updateTable();
    })
    .catch((error) => {
      console.error(error);
    });
}

function createUser(user) {
  fetch(`https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata`, {
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
  const userData = index + 1;
  fetch(
    `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata/${userData}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
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
function deleteUser(index) {
  const userData = index + 1;
  console.log(userData);
  fetch(
    `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata/${userData}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (response.ok) {
        data.splice(index, 1);
        updateTable();
        return response.json();
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
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);
    let cell8 = newRow.insertCell(7);
    let cell9 = newRow.insertCell(8);
    let cell10 = newRow.insertCell(9);
    let cell11 = newRow.insertCell(10);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = data[i].name;
    cell3.innerHTML = data[i].email;
    cell4.innerHTML = data[i].phonenumber;
    cell5.innerHTML = data[i].dateofbirth;
    cell6.innerHTML = data[i].gender;
    cell7.innerHTML = data[i].language;
    cell8.innerHTML = data[i].city;
    cell9.innerHTML = data[i].password;
    cell10.innerHTML = data[i].password;
    cell11.innerHTML = `<button onclick="updateRow(${i})" style="padding:5px 15px;background-color:purple;color:white;font-size:20px;border-radius:5px">Update</button>
                       <button onclick="deleteRow(${i})" style="padding:5px 15px;background-color:Red;color:white;font-size:20px;border-radius:5px">Delete</button>`;
  }
}

function updateRow(index) {
  username.value = data[index].name;
  userdateofbirth.value = data[index].dateofbirth;
  useremail.value = data[index].email;
  userphonenumber.value = data[index].phonenumber;
  userpassword.value = data[index].password;
  editIndex = index;
}
function deleteRow(index) {
  data.splice(index, 1);
  deleteUser(index);
  updateTable();
}

document.addEventListener("DOMContentLoaded", fetchData);
