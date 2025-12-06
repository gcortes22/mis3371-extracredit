
var d = new Date();
document.getElementById("today").innerHTML = d.toDateString();


document.getElementById("zip").addEventListener("blur", lookupZip);

function lookupZip() {
  var zip = document.getElementById("zip").value;
  var msg = document.getElementById("zipMsg");

  if (zip.length !== 5) {
    msg.style.color = "red";
    msg.innerHTML = "Invalid ZIP";
    return;
  }

  fetch("https://api.zippopotam.us/us/" + zip)
    .then(response => response.json())
    .then(data => {
      document.getElementById("city").value = data.places[0]["place name"];
      document.getElementById("state").value = data.places[0]["state"];
      msg.style.color = "green";
      msg.innerHTML = "Location found!";
    })
    .catch(()=>{
      msg.style.color = "red";
      msg.innerHTML = "ZIP not found!";
    })
}


function openModal() {
  if (!validateForm()) return;
  showReview();
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function submitForm() {
  alert("Form submitted successfully!");
}


function validateForm() {
  var ok = true;

  ok &= check("firstname", "err-firstname");
  ok &= check("lastname", "err-lastname");
  ok &= check("email", "err-email");

  return ok;
}

function check(id, msgId) {
  var value = document.getElementById(id).value;
  var msg = document.getElementById(msgId);

  if (value === "") {
    msg.style.color = "red";
    msg.innerHTML = "Required";
    return false;
  } else {
    msg.innerHTML = "";
    return true;
  }
}


function showReview() {
  var html = "";
  html += "Name: " + firstname.value + " " + lastname.value + "<br>";
  html += "Email: " + email.value + "<br>";
  html += "City: " + city.value + "<br>";
  html += "State: " + state.value + "<br>";
  html += "Password: <good><br>";

  document.getElementById("reviewInfo").innerHTML = html;
}


document.getElementById("showPass").addEventListener("change", function () {
  password.type = this.checked ? "text" : "password";
});


document.getElementById("password").addEventListener("keyup", function (e) {
  if (e.getModifierState("CapsLock")) {
    capsWarning.style.display = "block";
  } else {
    capsWarning.style.display = "none";
  }
});
