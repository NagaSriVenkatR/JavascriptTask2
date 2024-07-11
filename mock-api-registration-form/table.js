function returnPage() {
  window.location.href = "index.html";
}
window.onload = () => {
  tableAdd();
};
function tableAdd() {
  fetch(`https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let table = "";
      for (let i = 0; i < data.length; i++) {
        let sno=i+1;
        data;
        table += "<tr>";
        table += "<td>" + sno + "</td>";
        table += "<td>" + data[i].name + "</td>";
        table += "<td>" + data[i].email + "</td>";
        table += "<td>" + data[i].phonenumber + "</td>";
        table += "<td>" + data[i].dob + "</td>";
         table += "<td>" + data[i].city + "</td>";
         table += "<td>" + data[i].state + "</td>";
        table += "<td>" + data[i].password + "</td>";
        table += "<td>" + data[i].confirmpassword + "</td>";
        table += "<td>" + data[i].gender + "</td>";
        table += "<td>" + data[i].language + "</td>";
        table += `<td> <button style="padding:5px 15px;background-color:purple;color:white;font-size:20px;border-radius:5px" onclick = 'editData(${data[i].id})'>Edit</button> <button style="padding:5px 15px;background-color:Red;color:white;font-size:20px;border-radius:5px" onclick = 'deleteData( 
         ${data[i].id })'>Delete</button></td>`;
      }
      document.getElementById("tbody").innerHTML = table;
    });
}
function deleteData(Id) {

  fetch(
    `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata/${Id}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(`User with ID ${Id} deleted successfully`);
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      // Handle errors gracefully, e.g., show an error message to the user
    });
}

function editData(userId) { 
   window.location.href = `index.html?edit=${userId}`;
  }