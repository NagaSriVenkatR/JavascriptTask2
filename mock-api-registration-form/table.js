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
        let sno = i + 1;
        data;
        table += "<tr class='data'>";
        table += "<td class=''>" + sno + "</td>";
        table += "<td class=''>" + data[i].name + "</td>";
        table += "<td class=''>" + data[i].email + "</td>";
        table += "<td class=''>" + data[i].phonenumber + "</td>";
        table += "<td class=''>" + data[i].dob + "</td>";
        table += "<td class=''>" + data[i].city + "</td>";
        table += "<td class=''>" + data[i].state + "</td>";
        table += "<td class=''>" + data[i].password + "</td>";
        table += "<td class=''>" + data[i].confirmpassword + "</td>";
        table += "<td class=''>" + data[i].gender + "</td>";
        table += "<td class=''>" + data[i].language + "</td>";
        table += `<td class="cont"> 
        <button class="btn btn-success me-3"  onclick = 'editData(${data[i].id})'>Edit</button>
         <button class="btn btn-danger"  onclick = 'deleteData( ${data[i].id})'>Delete</button></td>`;
        table += "<tr>";
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
      tableAdd();
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

function editData(userId) {
  window.location.href = `index.html?edit=${userId}`;
}
