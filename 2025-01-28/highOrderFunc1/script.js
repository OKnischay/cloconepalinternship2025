import {employeeData} from "./data.js"
const employeeList = document.querySelector("#employee-list");
const employeeName = new Set(employeeData.map((employee) => employee.name));
console.log(employeeName);

employeeName.forEach((name)=>{
    const li = document.createElement("li");
    li.innerHTML = `<a href='#' data-name='${name}'>${name}</a>`;
    employeeList.appendChild(li);
})

const showEmpDetail = (name) => {
    const detailSec = document.querySelector("#employee-detail");
    const empName = document.querySelector("#employee-name");
    const empData = document.getElementById("employee-data");
    const totalHrs = document.getElementById("total-hours");
    
    const employeeEntries = employeeData.filter((emp) => emp.name === name);

  empName.textContent = `${name}'s Work Details`;
  empData.innerHTML = employeeEntries
    .map((entry) => {
      return `<tr><td>${entry.date}</td><td>${entry.workedHours}</td></tr>`;
    })
    .join("");

  const totalHours = employeeEntries.reduce(
    (sum, entry) => sum + entry.workedHours,
    0
  );
  totalHrs.textContent = `Total Worked Hours: ${totalHours}`;

  document.querySelector("#employee-list").style.display = "none";
  detailSec.style.display = "block";
}
document.querySelectorAll("#employee-list a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const name = this.dataset.name;
      showEmpDetail(name);
    });
  });
document.querySelector("#back-button").addEventListener("click", () => {
  document.querySelector("#employee-detail").style.display = "none";
  document.querySelector("#employee-list").style.display = "block";
});
