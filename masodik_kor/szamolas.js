import { szazalekSzamitas } from "./szazalek.js";

let becsekkolt = 0;

const todo1 = {
  todo: "Kitakaritani",
  isCompleted: false,
  nehezseg: 5,  
};
const todo2 = {
  todo: "Mosni",
  isCompleted: false,
  nehezseg: 2, 
};
const todo3 = {
  todo: "Bevásárolni",
  isCompleted: false,
  nehezseg: 3, 
};
const todo4 = {
  todo: "Főzni",
  isCompleted: false,
  nehezseg: 2,  
};

const todos = [todo1, todo2, todo3, todo4];

const chekedSzoveg = 'style="text-decoration: line-through ;"';

export const szamolasok = () => {

  const todoBeilleszt = document.querySelector("#felsorolas");
  todoBeilleszt.innerHTML = "";
  todos.forEach((todo) => {
    let sorSzam = todos.indexOf(todo) + 1;
    todoBeilleszt.innerHTML =
      todoBeilleszt.innerHTML +
      `<div class="todoItemek">
    <input type="checkbox" ${todo.isCompleted ? "checked" : ""}> 
    <span class="sorszam" ${
      todo.isCompleted ? chekedSzoveg : 'style="color: red ;"'
    }>${sorSzam}.${todo.todo} - ${todo.nehezseg}</span> <span class="deleteX">X</span>
    </div>`;
  });
  // Innen jon a visszairas a konyvtarba
  let deleteGombok = document.querySelectorAll(".deleteX");
  deleteGombok.forEach((del, index) => del.addEventListener("click", () => {  
    console.log(index);
    todos.splice(index,1);
    console.log(todos);
    szamolasok()
    
    } ));
  const checkboxok = document.querySelectorAll("input[type='checkbox']");

  checkboxok.forEach((item) => item.addEventListener("click", () => csekk()));

  const csekk = () => {
    becsekkolt = 0;
    checkboxok.forEach((item, index) => {
      todos[index].isCompleted = item.checked;
      if (item.checked ? becsekkolt++ : 0);
      szamolasok();
    });
  };

  const ertekId = document.getElementById("ertek");
  let osszDb = checkboxok.length;
  ertekId.innerText = szazalekSzamitas(osszDb, becsekkolt) + " %";
  
  
};

let save = document.getElementById("save_btn");

save.addEventListener('click', () => {
  let szoveg_val = document.getElementById("szoveg_bevitel").value;
  let szoveg = document.getElementById("szoveg_bevitel");
  let szam_val = document.getElementById("ertek_bevitel").value;
  let szam = document.getElementById("ertek_bevitel");
  if (szoveg_val != "") {
    let az = ("todo"+ (todos.length + 1));
    az = {};
    az.todo = szoveg_val; 
    az.isCompleted = false;
    if (szam_val == ""){
      az.nehezseg = 1;
    } else {
      az.nehezseg = parseInt(szam_val);
    }
    todos.push(az)

  }
  
  console.log(todos);
  szoveg.value = "";
  szam.value = "";
  szamolasok();
})

