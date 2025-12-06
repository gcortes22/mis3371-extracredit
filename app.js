/*
Program name: app.js
Author: Gabriela Cortes
Date created: 12/05/2025
Description: Validation + Fetch API + iFrame support + cookies + localStorage
*/


function $(id) {
  return document.getElementById(id);
}

const LS_PREFIX = "gaby_hw4_";
let cookieFirstName = "";


function showDate() {
  var d = new Date();
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var todayEl = $("today");
  if (todayEl) {
    todayEl.textContent =
      days[d.getDay()] + ", " + months[d.getMonth()] + " " +
      d.getDate() + ", " + d.getFullYear();
  }
}


function showMsg(id, text, ok) {
  var el = $(id);
  if (!el) return;
  el.innerHTML = text;
  el.style.color = ok ? "green" : "red";
}

function mark(el, good) {
  if (!el) return;
  el.classList.remove("invalid", "valid");
  if (good === true) el.classList.add("valid");
  if (good === false) el.classList.add("invalid");
}



function valFirst() {
  var el = $("firstname");
  var v = el.value.trim();
  var ok = /^[A-Za-z\-']{1,30}$/.test(v);
  mark(el, ok);
  showMsg("err-firstname", ok ? "" : "Only letters, apostrophes, and dashes allowed.", ok);
  return ok;
}

function valMiddle() {
  var el = $("middleinit");
  var v = el.value.trim();
  var ok = (v === "") || /^[A-Za-z]$/.test(v);
  mark(el, ok);
  showMsg("err-middleinit", ok ? "" : "Use one letter or leave blank.", ok);
  return ok;
}

function valLast() {
  var el = $("lastname");
  var v = el.value.trim();
  var ok = /^[A-Za-z\-']{1,30}$/.test(v);
  mark(el, ok);
  showMsg("err-lastname", ok ? "" : "Only letters, apostrophes, and dashes allowed.", ok);
  return ok;
}

function valDOB() {
  var el = $("dob");
  if (!el.value) {
    mark(el, false);
    showMsg("err-dob", "Please enter your date of birth.", false);
    return false;
  }
  var d = new Date(el.value);
  var today = new Date();
  var min = new Date();
  min.setFullYear(today.getFullYear() - 120);
  var ok = (d <= today && d >= min);
  mark(el, ok);
  showMsg("err-dob", ok ? "" : "Invalid date range.", ok);
  return ok;
}

function valMoveIn() {
  var el = $("movein");
  if (!el.value) {
    mark(el, true);
    showMsg("err-movein", "", true);
    return true;
  }
  var d = new Date(el.value);
  var today = new Date();
  var ok = d >= today;
  mark(el, ok);
  showMsg("err-movein", ok ? "" : "Cannot be in the past.", ok);
  return ok;
}


function formatSSN() {
  var el = $("ssn");
  var v = el.value.replace(/[^0-9]/g, "");
  if (v.length > 9) v = v.slice(0, 9);
  if (v.length > 5) v = v.slice(0, 3) + "-" + v.slice(3, 5) + "-" + v.slice(5);
  else if (v.length > 3) v = v.slice(0, 3) + "-" + v.slice(3);
  el.value = v;
}

function valSSN() {
  var el = $("ssn");
  var ok = (el.value === "" || /^\d{3}-\d{2}-\d{4}$/.test(el.value));
  mark(el, ok);
  showMsg("err-ssn", ok ? "" : "Format must be 123-45-6789.", ok);
  return ok;
}

function valEmail() {
  var el = $("email");
  el.value = el.value.toLowerCase();
  var ok = /^\S+@\S+\.\S+$/.test(el.value);
  mark(el, ok);
  showMsg("err-email", ok ? "" : "Invalid email format.", ok);
  return ok;
}

function valPhone() {
  var el = $("phone");
  var v = el.value.replace(/[^0-9]/g, "");
  if (v.length > 10) v = v.slice(0, 10);
  if (v.length > 6) v = v.slice(0,3) + "-" + v.slice(3,6) + "-" + v.slice(6);
  else if (v.length > 3) v = v.slice(0,3) + "-" + v.slice(3);
  el.value = v;
  var ok = el.value === "" || /^\d{3}-\d{3}-\d{4}$/.test(el.value);
  mark(el, ok);
  showMsg("err-phone", ok ? "" : "Use 000-000-0000.", ok);
  return ok;
}

function valAddr1() {
  var el = $("addr1");
  var v = el.value.trim();
  var ok = v.length >= 2 && v.length <= 30;
  mark(el, ok);
  showMsg("err-addr1", ok ? "" : "2–30 characters required.", ok);
  return ok;
}

function valAddr2() {
  var el = $("addr2");
  var v = el.value.trim();
  var ok = (v === "") || (v.length >= 2 && v.length <= 30);
  mark(el, ok);
  showMsg("err-addr2", ok ? "" : "If filled, 2–30 characters.", ok);
  return ok;
}

function valCity() {
  var el = $("city");
  var v = el.value.trim();
  var ok = v.length >= 2 && v.length <= 30;
  mark(el, ok);
  showMsg("err-city", ok ? "" : "2–30 characters.", ok);
  return ok;
}

function valState() {
  var el = $("state");
  var ok = el && el.value !== "";
  mark(el, ok);
  showMsg("err-state", ok ? "" : "Please choose a state.", ok);
  return ok;
}

function valZip() {
  var el = $("zip");
  el.value = el.value.replace(/[^0-9]/g, "").slice(0, 5);
  var ok = /^\d{5}$/.test(el.value);
  mark(el, ok);
  showMsg("err-zip", ok ? "" : "5 digits required.", ok);
  return ok;
}

function valSalary() {
  var el = $("salary");
  if (!el) return true;
  $("salaryOut").textContent = "$" + Number(el.value).toLocaleString();
  return true;
}

function valSymptoms() {
  var el = $("symptoms");
  var ok = el.value.indexOf('"') === -1;
  mark(el, ok);
  showMsg("err-symptoms", ok ? "" : "Avoid double quotes (\").", ok);
  return ok;
}

function valUserId() {
  var el = $("userid");
  var ok = /^[A-Za-z_][A-Za-z0-9_-]{4,19}$/.test(el.value);
  mark(el, ok);
  showMsg("err-userid", ok ? "" : "5–20 chars, no spaces, not starting with number.", ok);
  return ok;
}

function valPassword() {
  var el = $("password");
  var uid = $("userid").value;
  var p = el.value;
  var ok = (p.length >= 8 &&
            /[A-Z]/.test(p) &&
            /[a-z]/.test(p) &&
            /\d/.test(p) &&
            p !== uid);
  mark(el, ok);
  showMsg("err-password", ok ? "" :
    "8+ chars, upper+lower+digit, not same as user ID.", ok);
  return ok;
}

function valPassword2() {
  var el = $("password2");
  var ok = el.value === $("password").value && el.value !== "";
  mark(el, ok);
  showMsg("err-password2", ok ? "" : "Passwords must match.", ok);
  return ok;
}



function validateAll() {
  var ok = true;
  ok = valFirst()      && ok;
  ok = valMiddle()     && ok;
  ok = valLast()       && ok;
  ok = valDOB()        && ok;
  ok = valMoveIn()     && ok;
  ok = valSSN()        && ok;
  ok = valEmail()      && ok;
  ok = valPhone()      && ok;
  ok = valAddr1()      && ok;
  ok = valAddr2()      && ok;
  ok = valCity()       && ok;
  ok = valState()      && ok;
  ok = valZip()        && ok;
  ok = valSalary()     && ok;
  ok = valSymptoms()   && ok;
  ok = valUserId()     && ok;
  ok = valPassword()   && ok;
  ok = valPassword2()  && ok;

  var html = '<table class="review-table">';
  var fields = [
    "First Name","Middle Initial","Last Name","DOB","Move-in","SSN/ID",
    "Email","Phone","Address1","Address2","City","State","Zip",
    "Salary","Symptoms","User ID","Password","Confirm Password"
  ];
  var checks = [
    valFirst(),valMiddle(),valLast(),valDOB(),valMoveIn(),valSSN(),
    valEmail(),valPhone(),valAddr1(),valAddr2(),valCity(),valState(),
    valZip(),valSalary(),valSymptoms(),valUserId(),valPassword(),valPassword2()
  ];
  for (var i = 0; i < fields.length; i++) {
    html += "<tr><td>" + fields[i] + "</td><td style='text-align:right'>" +
      (checks[i] ? "<span class='pass'>pass</span>" :
                   "<span class='fail'>error</span>") +
      "</td></tr>";
  }
  html += "</table>";
  $("reviewBody").innerHTML = html;

  $("btnRealSubmit").style.display = ok ? "inline-block" : "none";

  // HW4: if valid (or even if not), remember data if allowed
  saveNameCookie();
  saveAllToLocal();

  return ok;
}



function resetForm() {
  var msgs = document.getElementsByClassName("msg");
  for (var i = 0; i < msgs.length; i++) msgs[i].innerHTML = "";

  var inputs = document.querySelectorAll("input, textarea, select");
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].classList.remove("invalid", "valid");
  }

  $("btnRealSubmit").style.display = "none";
  $("reviewBody").innerHTML =
    "<p class='muted'>After I click <b>Validate</b> it will show pass/error here for testing.</p>";

  valSalary();

  // After reset, default Remember Me back to checked
  var rm = $("rememberMe");
  if (rm) rm.checked = true;
}



async function loadStates() {
  var sel = $("state");
  if (!sel) return;
  try {
    const resp = await fetch("states.txt");
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const text = await resp.text();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    sel.innerHTML = '<option value="">Choose state</option>';
    lines.forEach(line => {
      // allow "AL|Alabama" or just "Alabama"
      const parts = line.split("|");
      const value = (parts[0] || "").trim();
      const label = (parts[1] || parts[0] || "").trim();
      if (value) {
        const opt = document.createElement("option");
        opt.value = label;     // show full friendly name in value
        opt.textContent = label;
        sel.appendChild(opt);
      }
    });
  } catch (e) {
    console.error("Error loading states.txt:", e);
    // fallback: leave whatever was in HTML
  }
}

async function loadConditions() {
  var cell = $("conditionsCell");
  if (!cell) return;
  try {
    const resp = await fetch("conditions.txt");
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const text = await resp.text();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    cell.innerHTML = "";
    lines.forEach(cond => {
      const label = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.name = "conditions";
      cb.value = cond;
      label.appendChild(cb);
      label.appendChild(document.createTextNode(" " + cond + " "));
      cell.appendChild(label);
    });
  } catch (e) {
    console.error("Error loading conditions.txt:", e);
    // fallback: leave loading message
  }
}



function setCookie(cname, cvalue, exDays) {
  const d = new Date();
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) +
                    ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function eraseCookie(cname) {
  document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}


function updateWelcomeFromCookie() {
  var welcomeEl = $("welcomeText");
  var wrapper = $("notYouWrapper");
  var cookieNameSpan = $("cookieName");
  var rm = $("rememberMe");

  cookieFirstName = getCookie("patientName");

  if (cookieFirstName) {
    if (welcomeEl) welcomeEl.textContent = "Welcome back, " + cookieFirstName + "!";
    if (cookieNameSpan) cookieNameSpan.textContent = cookieFirstName;
    if (wrapper) wrapper.style.display = "block";
    if (rm) rm.checked = true;
  } else {
    if (welcomeEl) welcomeEl.textContent = "Hello new user";
    if (wrapper) wrapper.style.display = "none";
  }
}


function saveNameCookie() {
  var rm = $("rememberMe");
  if (!rm || !rm.checked) {
    eraseCookie("patientName");
    updateWelcomeFromCookie();
    return;
  }
  var fname = $("firstname") ? $("firstname").value.trim() : "";
  if (fname) {
    setCookie("patientName", fname, 2); // <= 48 hours
  }
  updateWelcomeFromCookie();
}



function clearLocalStorageData() {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    let key = localStorage.key(i);
    if (key && key.startsWith(LS_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}


function saveAllToLocal() {
  var rm = $("rememberMe");
  if (!rm || !rm.checked) return; 

  var ids = [
    "firstname", "middleinit", "lastname",
    "dob", "movein",
    "email", "phone",
    "addr1", "addr2",
    "city", "state", "zip",
    "salary", "symptoms",
    "userid"
  ];

  ids.forEach(function(id) {
    var el = $(id);
    if (el) {
      localStorage.setItem(LS_PREFIX + id, el.value);
    }
  });

  // housing radio
  var housing = document.querySelector("input[name='housing']:checked");
  localStorage.setItem(LS_PREFIX + "housing", housing ? housing.value : "");

  // vaccinated radio
  var vacc = document.querySelector("input[name='vaccinated']:checked");
  localStorage.setItem(LS_PREFIX + "vaccinated", vacc ? vacc.value : "");

  // conditions checkboxes
  var conds = Array.from(document.querySelectorAll("input[name='conditions']:checked"))
                   .map(cb => cb.value);
  localStorage.setItem(LS_PREFIX + "conditions", JSON.stringify(conds));
}


function loadFromLocal() {
  var rm = $("rememberMe");
  if (!rm || !rm.checked) return;

  var ids = [
    "firstname", "middleinit", "lastname",
    "dob", "movein",
    "email", "phone",
    "addr1", "addr2",
    "city", "state", "zip",
    "salary", "symptoms",
    "userid"
  ];

  ids.forEach(function(id) {
    var el = $(id);
    if (!el) return;
    var v = localStorage.getItem(LS_PREFIX + id);
    if (v !== null) el.value = v;
  });

  // housing radio
  var housingVal = localStorage.getItem(LS_PREFIX + "housing");
  if (housingVal) {
    var hRadio = document.querySelector("input[name='housing'][value='" + housingVal + "']");
    if (hRadio) hRadio.checked = true;
  }

  // vaccinated radio
  var vaccVal = localStorage.getItem(LS_PREFIX + "vaccinated");
  if (vaccVal) {
    var vRadio = document.querySelector("input[name='vaccinated'][value='" + vaccVal + "']");
    if (vRadio) vRadio.checked = true;
  }

  // conditions checkboxes
  var condJson = localStorage.getItem(LS_PREFIX + "conditions");
  if (condJson) {
    try {
      var list = JSON.parse(condJson);
      document.querySelectorAll("input[name='conditions']").forEach(function(cb) {
        cb.checked = list.includes(cb.value);
      });
    } catch (e) {
      console.warn("Error parsing conditions from localStorage:", e);
    }
  }

  
  valSalary();
}



function handleNotYouClick(e) {
  e.preventDefault();
  eraseCookie("patientName");
  clearLocalStorageData();
  cookieFirstName = "";

  // clear form
  if ($("signup")) $("signup").reset();
  resetForm(); // to clear messages etc.
  updateWelcomeFromCookie();

  var notYou = $("notYouCheckbox");
  if (notYou) notYou.checked = false;
}



function start() {
  showDate();
  loadStates();
  loadConditions();
  updateWelcomeFromCookie();

 
  if (getCookie("patientName")) {
    loadFromLocal();

    
    var fnameEl = $("firstname");
    if (fnameEl && !fnameEl.value.trim()) {
      fnameEl.value = getCookie("patientName");
    }
  }

  
  $("firstname").oninput  = function(){ valFirst(); saveAllToLocal(); };
  $("middleinit").oninput = function(){ valMiddle(); saveAllToLocal(); };
  $("lastname").oninput   = function(){ valLast(); saveAllToLocal(); };
  $("dob").onblur         = function(){ valDOB(); saveAllToLocal(); };
  $("movein").onblur      = function(){ valMoveIn(); saveAllToLocal(); };
  $("ssn").oninput        = function(){ formatSSN(); valSSN(); };
  $("email").oninput      = function(){ valEmail(); saveAllToLocal(); };
  $("phone").oninput      = function(){ valPhone(); saveAllToLocal(); };
  $("addr1").oninput      = function(){ valAddr1(); saveAllToLocal(); };
  $("addr2").oninput      = function(){ valAddr2(); saveAllToLocal(); };
  $("city").oninput       = function(){ valCity(); saveAllToLocal(); };
  $("state").onchange     = function(){ valState(); saveAllToLocal(); };
  $("zip").oninput        = function(){ valZip(); saveAllToLocal(); };
  $("salary").oninput     = function(){ valSalary(); saveAllToLocal(); };
  $("symptoms").oninput   = function(){ valSymptoms(); saveAllToLocal(); };
  $("userid").oninput     = function(){ valUserId(); saveAllToLocal(); };
  $("password").oninput   = function(){ valPassword(); valPassword2(); };
  $("password2").oninput  = valPassword2;

  // housing / vaccinated / conditions 
  document.querySelectorAll("input[name='housing']")
    .forEach(r => r.addEventListener("change", saveAllToLocal));
  document.querySelectorAll("input[name='vaccinated']")
    .forEach(r => r.addEventListener("change", saveAllToLocal));
  document.addEventListener("change", function(e){
    if (e.target && e.target.name === "conditions") {
      saveAllToLocal();
    }
  });

  $("btnValidate").onclick = validateAll;
  $("btnReset").onclick    = resetForm;

  var form = $("signup");
  if (form) {
    form.onsubmit = function(e) {
      if ($("btnRealSubmit").style.display === "none") {
        e.preventDefault();
        alert("Please fix errors and click Validate again.");
      } else {
        
        saveNameCookie();
        saveAllToLocal();
      }
    };
  }

  
  var rm = $("rememberMe");
  if (rm) {
    rm.addEventListener("change", function() {
      if (!rm.checked) {
        
        eraseCookie("patientName");
        clearLocalStorageData();
        updateWelcomeFromCookie();
      } else {
        
        saveNameCookie();
        saveAllToLocal();
      }
    });
  }

  
  var notYou = $("notYouCheckbox");
  if (notYou) {
    notYou.addEventListener("change", handleNotYouClick);
  }

  valSalary(); 
}

document.addEventListener("DOMContentLoaded", start);
