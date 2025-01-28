let apiLink = 'https://api.jsonbin.io/v3/b/67986068e41b4d34e47fd94d';
let result;

const fetchData = fetch(`${apiLink}`, {
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$ps/aDFvJTFfK8b3jRM04P.tYYMdlJwNnRJ1xOlqiwnqCAKIYaefi2'
    },

})
    .then(res => {
        return res.json();
    })
    .then((data) => {
        result = data.record;
        console.log(result)
        const genderSet = new Set(data.record.map((data) => data.gender));
        console.log(genderSet)
        genderSet.forEach((gender) => {
            const listElement = document.createElement("li")
            document.querySelector("#record-list").append(listElement);
            listElement.innerHTML = `<li><a href="#" data-gender="${gender}">${gender}</a></li>`
        })

        document.querySelectorAll("#record-list a").forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const gender = this.dataset.gender
                console.log(gender)
                userDetail(gender);
            });
        });
    })
    .catch(error => console.log(error))

const userDetail = (gender) => {
    const userData = document.getElementById("data-here");
    const userGender = document.getElementById('gender-title');
    const userEntry = result.filter((user) => user.gender === gender);

    userGender.textContent = `${gender}' status`;
    userData.innerHTML = userEntry
        .map((entry) => {
            return `<tr>
            <td>${entry.name}</td>
            <td>${entry.address}</td>
            <td>${entry.email}</td>
            <td>${entry.phone}</td>
            <td>${entry.status}</td></tr>`;
        })
        .join("");
    document.querySelector("#record-list").style.display = "none";
    document.querySelector("#user-name").style.display = "block";
    document.querySelector(".back-button").style.display = "block";
    document.querySelector(".back-button").addEventListener("click", function (e) {
        console.log('hi')
        document.getElementById("user-name").style.display = "none";
        document.querySelector(".back-button").style.display = "none"
        document.getElementById("record-list").style.display = "block";
        document.getElementById("total").style.display = "none";

    })

    console.log("User Entry ============> ", userEntry.filter((d) => d.status === "Married"))
const totalMarried = userEntry.reduce((total,currentValue)=>{
    let count = 0;
    if(currentValue.status === "Married"){
        count++;
        total += count;
    }
    return total;
},0)
const flowerless = document.querySelector("#total");
console.log(totalMarried)
flowerless.textContent = `Total married: ${totalMarried}`
flowerless.style.display = "block";
}

// document.getElementById("back-button").addEventListener("click", (e) => {
//     console.log("hi")
//     document.getElementById("user-table").style.display = "none";
//     document.querySelector("#record-list").style.display = "block";
// })

