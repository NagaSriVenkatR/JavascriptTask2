
let fullname = document.getElementById('fullname');
let userEmail = document.getElementById('email');
let userPhonenumber = document.getElementById('phonenumber');
let userCity = document.getElementById('city');
let userState = document.getElementById('state');
let userDob = document.getElementById('dateofbirth');
let userPassword = document.getElementById('password');
let userConfirmpassword = document.getElementById('confirmpassword');
let nameerr = document.getElementById("nameerror");
let languageserr = document.getElementById("languageerror");
let gendererr = document.getElementById("gendererror");
let emailerr = document.getElementById("emailerror");
let phonenumbererr = document.getElementById("phonenumbererror");
let doberr = document.getElementById("dateofbirtherror");
let cityerr = document.getElementById("cityerror");
let stateerr = document.getElementById("stateerror");
let passerr = document.getElementById("passworderror");
let confirmpasserr = document.getElementById("confirmpassworderror");
function myfunction(event) {
  event.preventDefault();
  doberr.innerHTML = "";
  nameerr.innerHTML = "";
  languageserr.innerHTML = "";
  gendererr.innerHTML = "";
  emailerr.innerHTML = "";
  phonenumbererr.innerHTML = "";
  cityerr.innerHTML="";
  stateerr.innerHTML = "";
  passerr.innerHTML = "";
  confirmpasserr.innerHTML = "";
  let namePattern = /^([a-zA-Z]{3,})$/;
  let emailPattern =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-zA-Z]+).([a-zA-Z]{2,20})$/;
  let phonenumberpattern = /^([0-9]{10})$/;
  let upperCasePattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let specialCharacterPattern = /[~!@#%&()$^_?]/;
  let minlengthCharacterPattern = /^.{8,16}$/;
  let name = fullname.value;
  let email = userEmail.value;
  let password = userPassword.value;
  let phonenumber = userPhonenumber.value;
  let dob = userDob.value;
  let confirmpassword = userConfirmpassword.value;
     let usergenderElement = document.querySelector(
       'input[name="gender"]:checked'
     );
     let usergender = usergenderElement ? usergenderElement.value : "";

     let userlanguagesElements = document.querySelectorAll(
       'input[type="checkbox"]:checked'
     );
     let userlanguages = [];
     userlanguagesElements.forEach((checkbox) => {
       userlanguages.push(checkbox.value);
     });
  let city = userCity.value;
  let state = userState.value;
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
  if (dob === "") {
    doberr.innerHTML = "Date Of Birth is required";
  }
  if (phonenumber === "") {
    phonenumbererr.innerHTML = "Phone Number is required";
  } else if (!phonenumberpattern.test(phonenumber)) {
    phonenumbererr.innerHTML = "Invalid phone number format";
    return;
  }
  if (!usergender) {
    gendererr.innerHTML = "gender is required";
  }
  if (!userlanguages) {
    languageserr.innerHTML = "language is required";
  }
  if (city === "") cityerr.innerHTML = "city is required";
  if (state === "") stateerr.innerHTML = "state is required";
  if (password === "") {
    passerr.innerHTML = "Password is required";
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
  if (confirmpassword === "") {
    confirmpasserr.innerHTML = "confirm password is required";
  } else if (confirmpassword !== password) {
    confirmpasserr.innerHTML =
      "check your confirm password and password should be same";
    return;
  } 
  const obj = {
    name: fullname.value,
    email: userEmail.value,
    phonenumber: userPhonenumber.value,
    dob: userDob.value,
    city: userCity.value,
    state: userState.value,
    password:userPassword.value,
    confirmpassword:userConfirmpassword.value,
    gender:usergender,
    language:userlanguages,
  };
  fetch(`https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(obj),
  })
  .then((res)=>res.json())
  .then((data)=>{console.log(data)})
  .then(()=> (window.location.href = "table.html"));
  document.getElementById("myform").reset();
}
