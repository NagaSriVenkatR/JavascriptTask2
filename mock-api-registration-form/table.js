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
        data;
        table += "<tr>";
        table += "<td>" + data[i + 1] + "</td>";
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
        table +=  `<td> <button style="padding:5px 15px;background-color:purple;color:white;font-size:20px;border-radius:5px" onclick = 'editData(" +
          data[i].id +
          ")'>Edit</button> <button style="padding:5px 15px;background-color:Red;color:white;font-size:20px;border-radius:5px" onclick = 'deleteData(" +
          data[i].id +
          ")'>Delete</button></td>`;
      }
      document.getElementById("tbody").innerHTML = table;
    });
}
function deleteData(id) {
  fetch(
    `https://6683c44d56e7503d1ade07d4.mockapi.io/userData/registerdata/${id}`,
    {
      method: "DELETE",
    }
  )
    .then(() => {
      tableAdd(); // Refresh the table after deletion
    })
    .catch((error) => console.error("Error deleting data:", error)); // Debug: Log delete errors
}

function editData(userId) {
  window.location.href = `index.html?edit=${userId}`;
}
