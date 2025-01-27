let error = false;
const form = document.getElementById("form");
form.addEventListener('submit', function (e) {
        // prevents the form from submitting
        e.preventDefault();
        
        validateName();
        validateAddress();
        validateEmail();
        // validateEssay();
        // validateIq();
        validatePhone();
        if (!error) {
            const formData = new FormData(form);
            console.log(formData)
            formSubmit(formData);
        }
    })

    const formSubmit = (formData) => {
        let dataObject = Object.fromEntries(formData);
        console.log(JSON.stringify(dataObject))
    fetch('https://api.jsonbin.io/v3/b/',{
        method: "POST",
        headers : {
            'Content-Type' : 'application/json', //format
            'X-Master-Key' : '$2a$10$ps/aDFvJTFfK8b3jRM04P.tYYMdlJwNnRJ1xOlqiwnqCAKIYaefi2'
        },
        body: JSON.stringify(dataObject),
    }).then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        myFunction();
        console.log(data);
        displayData(dataObject);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:',error);
    });
    function myFunction() {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    } 
}
    function displayData(data){
        
        const outputDiv = document.getElementById("submitted_data");
        outputDiv.innerHTML = ""
        for (const [key, value] of Object.entries(data)) {
            const p = document.createElement("ul");
            p.textContent = `${key}: ${value}`;
            outputDiv.appendChild(p);
        }
    }

    function validateName(){
        const nameField = document.getElementById("name");
        const name = nameField.value.trim();
        if (name === "" || name.length<3 || name.length>30 ) {
        document.getElementById("nameError").innerHTML = "*Name cannot be empty and must be between 3 to 30 charcters"
        nameField.focus();
        error = true;
    } else {
        document.getElementById("nameError").innerHTML = ""
    }
}
 
function validateAddress(){
    const addressField = document.getElementById("address");
    const address = addressField.value.trim();
    if (address === "" || address.length<3 || address.length>20) {
        document.getElementById("addressError").innerHTML = "*Address cannot be empty and must be between 3 to 20 characters"
        error = true;
        addressField.focus();
    } else {
        document.getElementById("addressError").innerHTML = ""
    }
}

 function validateEmail(){

    const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const emailField = document.getElementById("email");
        const email = emailField.value.trim();
        if (email === "") {
        document.getElementById("emailError").innerHTML = "*Email field cannot be empty"
        error = true;
        emailField.focus();
        
    } else if (!emailRegex.test(email)) {
        // regex.test() is a built in function to validate things with the regex
        document.getElementById("emailError").innerHTML = "*Invalid email"
        error = true;
    }else {
        document.getElementById("emailError").innerHTML = "";
    }
}

 function validatePhone(){
    const phoneField = document.getElementById("phone");
    const phone = phoneField.value.trim();
       if (phone === null || phone.length>10 || phone.length<10) {
        document.getElementById("phoneError").innerHTML = "*Phone number must be 10 numbers"
        error = true;
        phoneField.focus();
    } else {
        document.getElementById("phoneError").innerHTML = ""
    }
}
function validateIq(){
    const iqField = document.getElementById("iq");
    const iq = iqField.value.trim();
    if (iq == "" || iq < 0 || iq > 200) {
        document.getElementById("iqError").innerHTML = "*Don't be shy"
        error = true;
        iqField.focus();
        
    } else {
        document.getElementById("iqError").innerHTML = ""
    }
}

 function validateEssay(){
    const essayField = document.getElementById("essay");
    const essay = essayField.value.trim();
       if (essay.length < 50) {
        document.getElementById("essayError").innerHTML = "*Why is this empty?"
        error = true;
        essayField.focus();
        
    } else {
        document.getElementById("essayError").innerHTML = ""
    }
    }
