let addSubject = document.getElementsByClassName("addSubject");
let calc = document.getElementsByClassName("calc");
let addGrade = document.getElementsByClassName("addGrade");
let gradeValues;

function updateGradeOptions() {
  let gradeInputs = document.getElementsByClassName("grade");
  gradeValues = [];
  // Collect all grade values
  for (let i = 0; i < gradeInputs.length; i++) {
    if (gradeInputs[i].value.trim() !== "") {
      gradeValues.push(gradeInputs[i].value.toUpperCase());
    }
  }

  // Update all select dropdowns
  let selectors = document.getElementsByClassName("selector");
  for (let i = 0; i < selectors.length; i++) {
    let selector = selectors[i];

    // Save Grade selected State
    let save = selector.value;
    let state = false;

    // Clear existing options
    selector.innerHTML = "";

    // Add new options
    for (let j = 0; j < gradeValues.length; j++) {
      let op = document.createElement("option");
      op.innerHTML = gradeValues[j];
      if (gradeValues[j] == save) state = true;
      selector.appendChild(op);
    }
    if (state) selector.value = save;
  }
}

// Add Element Function.
addSubject[0].onclick = function () {
  let con = document.createElement("div");
  let inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = "Name";
  con.appendChild(inp);
  inp = document.createElement("input");
  inp.type = "number";
  inp.placeholder = "Credit Hours";
  inp.className = "creditHours";
  con.appendChild(inp);
  let sel = document.createElement("select");
  sel.className = "selector";
  con.appendChild(sel);
  let btn = document.createElement("button");
  btn.className = "delete";
  btn.innerHTML = "Delete";
  con.appendChild(btn);
  addSubject[0].before(con);
  con.children[0].focus();
  updateGradeOptions();
};

// Add Grade Function.
addGrade[0].onclick = function () {
  let con = document.createElement("div");
  let inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = "Grade";
  inp.className = "grade";
  con.appendChild(inp);
  inp = document.createElement("input");
  inp.type = "number";
  inp.placeholder = "Grade Hours";
  inp.className = "gradeHours";
  con.appendChild(inp);
  let btn = document.createElement("button");
  btn.className = "delete";
  btn.innerHTML = "Delete";
  con.appendChild(btn);
  addGrade[0].before(con);

  inp = con.querySelector(".grade");
  inp.addEventListener("input", updateGradeOptions);
};

// Delete Button Function
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateGradeOptions();
  }
});

document.addEventListener("focusout", function (e) {
  // Credit Hours Input Value Checking
  if (e.target.classList.contains("creditHours") && e.target.value == "") {
    e.target.value = 0;
  }
  // Grade Input Value Checking

  if (e.target.classList.contains("grade") && e.target.value == "") {
    e.target.value = "A";
    updateGradeOptions();
  } else if (e.target.classList.contains("grade") && e.target.value != "") {
    e.target.value = e.target.value.toUpperCase();
    updateGradeOptions();
  }
  // Grade Hours Input Value Checking
  if (e.target.classList.contains("gradeHours") && e.target.value == "") {
    e.target.value = "0";
  }
});

//GPA Calculator
calc[0].onclick = function () {
  let totalHours = 0,
    calculation = 0;
  let cHours = document.getElementsByClassName("creditHours");
  let slct = document.getElementsByTagName("select");
  for (let j = 0; j < slct.length; j++) {
    let grades = document.getElementsByClassName("grade");
    for (let i = 0; i < grades.length; i++) {
      if (slct[j].value == grades[i].value) {
        calculation += parseFloat(
          grades[i].nextElementSibling.value * cHours[j].value
        );
        totalHours += parseFloat(cHours[j].value);
        break;
      }
    }
  }
  let save = (calculation / totalHours).toFixed(2);
  if (save > 4) calc[0].nextElementSibling.innerHTML = "4.00";
  else calc[0].nextElementSibling.innerHTML = save;
};

//Dark Mode
let img = document.getElementsByTagName("img");
img[0].onclick = function () {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    img[0].src = "Icons/moon.png";
    let ss = document.getElementsByClassName("main-button");
    Array.from(ss).forEach((btn) => {
      btn.style.backgroundColor = "white";
      btn.style.color = "black";
    });
    document.getElementById("ans").style.color = "black";
  } else {
    document.body.className = "dark";
    img[0].src = "Icons/sun-dim.png";
    let ss = document.getElementsByClassName("main-button");
    Array.from(ss).forEach((btn) => {
      btn.style.backgroundColor = "#191a2f";
      btn.style.color = "white";
    });
    document.getElementById("ans").style.color = "white";
  }
};
