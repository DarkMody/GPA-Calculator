let addSubject = document.getElementsByClassName("addSubject");
let calc = document.getElementsByClassName("calc");
let addGrade = document.getElementsByClassName("addGrade");
let gradeValues;
// localStorage.clear();
if (localStorage.getItem("grades") !== null) {
  let grd = JSON.parse(localStorage.getItem("grades")) || [];
  for (let i = 0; i < grd.length; i += 2) {
    addNewGrade(grd[i], grd[i + 1]);
  }

  let sub = JSON.parse(localStorage.getItem("subjects")) || [];
  for (let i = 0; i < sub.length; i += 3) {
    addNewSubject(sub[i], sub[i + 1], sub[i + 2]);
  }
  updateGradeOptions(true);
  let subjectsDiv = document.getElementsByClassName("left")[0].children;
  console.log(subjectsDiv);
  for (let i = 0; i < subjectsDiv.length - 1; i++) {
    subjectsDiv[i].children[2].value = sub[2 + i * 3];
  }
}
function updateLocalStorage() {
  let grades = document.getElementsByClassName("right")[0].children;
  let allGrades = [];
  Array.from(grades).forEach((ele) => {
    if (ele.tagName == "DIV") {
      allGrades.push(ele.children[0].value);
      allGrades.push(ele.children[1].value);
    }
  });
  localStorage.setItem("grades", JSON.stringify(allGrades));
  let subjects = document.getElementsByClassName("left")[0].children;
  let allSubjects = [];
  Array.from(subjects).forEach((ele) => {
    if (ele.tagName == "DIV") {
      allSubjects.push(ele.children[0].value);
      allSubjects.push(ele.children[1].value);
      allSubjects.push(ele.children[2].value);
    }
  });
  localStorage.setItem("subjects", JSON.stringify(allSubjects));
}
// New Subject Func
function addNewSubject(name, hrs, grd) {
  let con = document.createElement("div");
  let inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = "Name";
  inp.value = name;
  con.appendChild(inp);
  inp = document.createElement("input");
  inp.type = "number";
  inp.placeholder = "Credit Hours";
  inp.className = "creditHours";
  inp.value = hrs;
  con.appendChild(inp);
  let sel = document.createElement("select");
  sel.className = "selector";
  sel.value = grd;
  con.appendChild(sel);
  let btn = document.createElement("button");
  btn.className = "delete";
  btn.innerHTML = "Delete";
  con.appendChild(btn);
  addSubject[0].before(con);
  con.children[0].addEventListener("input", updateLocalStorage);
  con.children[1].addEventListener("input", updateLocalStorage);
  con.children[2].addEventListener("change", updateLocalStorage);
}
// New Grade Func
function addNewGrade(name, hrs) {
  let con = document.createElement("div");
  let inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = "Grade";
  inp.className = "grade";
  inp.value = name;
  con.appendChild(inp);
  inp = document.createElement("input");
  inp.type = "number";
  inp.placeholder = "Grade Hours";
  inp.className = "gradeHours";
  inp.value = hrs;
  con.appendChild(inp);
  let btn = document.createElement("button");
  btn.className = "delete";
  btn.innerHTML = "Delete";
  con.appendChild(btn);
  addGrade[0].before(con);
  inp = con.querySelector(".grade");
  inp.addEventListener("input", updateGradeOptions);
  let hours = con.querySelector(".gradeHours");
  hours.addEventListener("input", updateLocalStorage);
}
// Making a dynamic Grade Changeing
function updateGradeOptions(help = false) {
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

    // Clear existing option
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
  if (!help) updateLocalStorage();
}

// Add Subject Function.
addSubject[0].onclick = function () {
  addNewSubject("", "", "");
  updateGradeOptions();
};

// Add Grade Function.
addGrade[0].onclick = function () {
  addNewGrade("", "");
  updateLocalStorage();
};

// Delete Button Function
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateGradeOptions();
  }
});

document.addEventListener("focusout", function (e) {
  // Make Grades UpperCase
  if (e.target.classList.contains("grade") && e.target.value != "") {
    e.target.value = e.target.value.toUpperCase();
    updateGradeOptions();
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
