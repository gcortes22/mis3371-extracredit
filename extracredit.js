function $(id) { return document.getElementById(id); }



function buildModalSummary() {
  function field(id) {
    var el = $(id);
    return el ? el.value : "";
  }

  function maskedSSN() {
    var v = field("ssn");
    if (!v) return "(blank)";
    return "***-**-" + v.slice(-4);
  }

  var html = "";
  html += "<p><b>Name:</b> " + field("firstname") + " "
        + (field("middleinit") ? field("middleinit") + " " : "")
        + field("lastname") + "</p>";
  html += "<p><b>DOB:</b> " + field("dob") +
          " &nbsp; <b>Move-in Date:</b> " + field("movein") + "</p>";
  html += "<p><b>Address:</b> " + field("addr1") + " "
        + field("addr2") + ", "
        + field("city") + ", "
        + field("state") + " "
        + field("zip") + "</p>";
  html += "<p><b>Email:</b> " + field("email") +
          " &nbsp; <b>Phone:</b> " + field("phone") + "</p>";
  html += "<p><b>SSN / ID:</b> " + maskedSSN() + "</p>";
  html += "<p><b>User ID:</b> " + field("userid") +
          " &nbsp; <b>Password:</b> &lt;good&gt;</p>";

  $("modalSummary").innerHTML = html;
}

function openReviewModal() {
  var ok = true;
  if (typeof validateAll === "function") {
    ok = validateAll();     // use your HW4 validation
  }

  buildModalSummary();

  if (ok) {
    $("modalStatus").textContent =
      "All fields appear valid. Click Submit to finish.";
    $("modalSubmit").disabled = false;
  } else {
    $("modalStatus").textContent =
      "Some fields are invalid. Submit is disabled until you fix them.";
    $("modalSubmit").disabled = true;
  }

  $("confirmModal").style.display = "block";
}

function closeReviewModal() {
  $("confirmModal").style.display = "none";
}



function lookupZip(zip) {
  if (!zip || zip.length !== 5) {
    $("zip-status").textContent = "";
    return;
  }

  $("zip-status").style.color = "#666";
  $("zip-status").textContent = "Looking up city/state…";

  fetch("https://api.zippopotam.us/us/" + zip)
    .then(function (response) {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then(function (data) {
      var place = data.places[0];
      $("city").value = place["place name"];
      $("state").value = place["state"];
      $("zip-status").style.color = "green";
      $("zip-status").textContent = "Filled from ZIP.";
    })
    .catch(function () {
      $("zip-status").style.color = "red";
      $("zip-status").textContent = "ZIP not found.";
    });
}



function setupPasswordHelpers() {
  var pw = $("password");
  var show = $("showPassword");
  var caps = $("capsWarning");

  if (show && pw) {
    show.addEventListener("change", function () {
      pw.type = show.checked ? "text" : "password";
    });
  }

  if (pw && caps) {
    pw.addEventListener("keyup", function (e) {
      if (e.getModifierState && e.getModifierState("CapsLock")) {
        caps.style.display = "inline";
      } else {
        caps.style.display = "none";
      }
    });
  }
}



document.addEventListener("DOMContentLoaded", function () {
  // Use modal instead of direct validate/submit
  var btn = $("btnValidate");
  if (btn) {
    btn.onclick = openReviewModal;
  }

  
  $("modalClose").onclick = closeReviewModal;
  $("modalBack").onclick = closeReviewModal;
  $("modalSubmit").onclick = function () {
    if (this.disabled) return;
    $("signup").submit(); // real submit
  };
  window.addEventListener("click", function (e) {
    if (e.target === $("confirmModal")) {
      closeReviewModal();
    }
  });

  
  var zipInput = $("zip");
  if (zipInput) {
    zipInput.addEventListener("blur", function () {
      if (typeof valZip === "function") {
        valZip(); // keep your existing HW4 zip check
      }
      lookupZip(zipInput.value);
    });
  }

  // Password helpers
  setupPasswordHelpers();
});
