document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let editUserId = urlParams.get("edit");
  
  if (editUserId) { 
    fetch(
      `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata/${editUserId}`
    )
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("fullname").value = data.name || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phonenumber").value = data.phonenumber || "";
        document.getElementById("city").value = data.city || "";
        document.getElementById("state").value = data.state || "";
        document.getElementById("dateofbirth").value = data.dob || "";
        document.getElementById("password").value = data.password || "";
        document.getElementById("confirmpassword").value =
          data.confirmpassword || "";

        if (data.gender) {
          document.querySelector(
            `input[name="gender"][value="${data.gender}"]`
          ).checked = true;
        }

        if (data.language) {
          data.language.forEach((language) => {
            document.querySelector(
              `input[type="checkbox"][value="${language}"]`
            ).checked = true;
          });
        }

        document.getElementById("submitBtn").dataset.editId = editUserId;
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }
});

function myfunction(event) {
  event.preventDefault();
  document.querySelectorAll(".error").forEach((el) => (el.innerHTML = ""));
  let valid = true;
  let fullname = document.getElementById("fullname").value;
  let userEmail = document.getElementById("email").value;
  let userPhonenumber = document.getElementById("phonenumber").value;
  let userCity = document.getElementById("city").value;
  let userState = document.getElementById("state").value;
  let userDob = document.getElementById("dateofbirth").value;
  let userPassword = document.getElementById("password").value;
  let userConfirmpassword = document.getElementById("confirmpassword").value;
  let nameerr = document.getElementById("nameerror");
  let languageerr = document.getElementById("languageerror");
  let gendererr = document.getElementById("gendererror");
  let emailerr = document.getElementById("emailerror");
  let phonenumbererr = document.getElementById("phonenumbererror");
  let doberr = document.getElementById("dateofbirtherror");
  let cityerr = document.getElementById("cityerror");
  let stateerr = document.getElementById("stateerror");
  let passerr = document.getElementById("passworderror");
  let confirmpasserr = document.getElementById("confirmpassworderror");
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
  let namePattern = /^([a-zA-Z]{3,})$/;
  let emailPattern =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-zA-Z]+).([a-zA-Z]{2,20})$/;
  let phonenumberpattern = /^([0-9]{10})$/;
  let upperCasePattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let specialCharacterPattern = /[~!@#%&()$^_?]/;
  let minlengthCharacterPattern = /^.{8,16}$/;
  if (fullname === "") {
    nameerr.innerHTML = "Name is required";
    valid = false;
  } else if (!namePattern.test(fullname)) {
    nameerr.innerHTML = "Name should be at least three characters";
    valid = false;
  }
  if (userEmail === "") {
    emailerr.innerHTML = "Email is required";
    valid = false;
  } else if (!emailPattern.test(userEmail)) {
    emailerr.innerHTML = "Invalid email format";
    valid = false;
  }
  if (userDob === "") {
    doberr.innerHTML = "Date of Birth is required";
    valid = false;
  }
  if (userPhonenumber === "") {
    phonenumbererr.innerHTML = "Phone Number is required";
    valid = false;
  } else if (!phonenumberpattern.test(userPhonenumber)) {
    phonenumbererr.innerHTML = "Invalid phone number format";
    valid = false;
  }
  if (!usergender) {
    gendererr.innerHTML = "Gender is required";
    valid = false;
  }
  if (userlanguages.length === 0) {
    languageerr.innerHTML = "Language is required";
    valid = false;
  }
  if (userCity === "") {
    cityerr.innerHTML = "City is required";
    valid = false;
  }
  if (userState === "") {
    stateerr.innerHTML = "State is required";
    valid = false;
  }
  if (userPassword === "") {
    passerr.innerHTML = "Password is required";
    valid = false;
  } else {
    if (!minlengthCharacterPattern.test(userPassword)) {
      passerr.innerHTML += "Password must be between 8 and 16 characters<br>";
      valid = false;
    } else if (!upperCasePattern.test(userPassword)) {
      passerr.innerHTML += "At least 1 uppercase character<br>";
      valid = false;
    } else if (!lowerCasePattern.test(userPassword)) {
      passerr.innerHTML += "At least 1 lowercase character<br>";
      valid = false;
    } else if (!numberPattern.test(userPassword)) {
      passerr.innerHTML += "At least 1 number<br>";
      valid = false;
    } else if (!specialCharacterPattern.test(userPassword)) {
      passerr.innerHTML += "At least 1 special character<br>";
      valid = false;
    }
  }
  if (userConfirmpassword === "") {
    confirmpasserr.innerHTML = "Confirm Password is required";
    valid = false;
  } else if (userConfirmpassword !== userPassword) {
    confirmpasserr.innerHTML =
      "Check your confirm password and password should be same";
    valid = false;
  }
  if (valid) {
    let obj = {
      name: fullname,
      email: userEmail,
      phonenumber: userPhonenumber,
      dob: userDob,
      city: userCity,
      state: userState,
      password: userPassword,
      confirmpassword: userConfirmpassword,
      gender: usergender,
      language: userlanguages,
    };

    // const editUserId = document.getElementById("submitBtn").dataset.editId;

    // if (editUserId) {
    //   // Update existing entry
    //   fetch(
    //     `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(obj),
    //     }
    //   )
    //     .then((res) => {
    //       if (res.ok) {
    //         console.log("User updated successfully.");
    //         window.location.href = "table.html"; // Redirect to table page after successful update
    //       } else {
    //         console.error("Failed to update user:", res.status);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error updating user:", error);
    //     });
    // } else {
    //   // Create new entry
      fetch(
        `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("User created successfully.");
            window.location.href = "table.html"; // Redirect to table page after successful creation
          } else {
            console.error("Failed to create user:", res.status);
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    
  }
  document.getElementById("myform").reset();
}
