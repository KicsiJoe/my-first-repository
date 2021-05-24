import { szazalekSzamitas } from "./szazalek.js"

let becsekkolt = 0;

const todo1 = {
    todo: "Kitakaritani",
    isCompleted: false
}
const todo2 = {
    todo: "Mosni",
    isCompleted: false
}
const todo3 = {
    todo: "Bevásárolni",
    isCompleted: false
}
const todo4 = {
    todo: "Főzni",
    isCompleted: false
}

const todos = [
    todo1,
    todo2,
    todo3,
    todo4
]

const chekedSzoveg = 'style="text-decoration: line-through ;"'


export const szamolasok = () => {
    
    const todoBeilleszt = document.querySelector("#felsorolas"); 
    todoBeilleszt.innerHTML = "";
    todos.forEach(todo => {
        todoBeilleszt.innerHTML = todoBeilleszt.innerHTML +  `<div class="todoItemek">
    <input type="checkbox" ${todo.isCompleted ? "checked" : "" }> <span ${todo.isCompleted ? chekedSzoveg : 'style="color: red ;"' }>${todo.todo}</span>  
    </div>`
    });
    // Innen jon a visszairas a konyvtarba
    
    const inputok = document.querySelectorAll("input");

    const checkboxok = document.querySelectorAll("input[type='checkbox']")

    checkboxok.forEach((item) => item.addEventListener("click", () => csekk()))
    
    const csekk = () => {
        becsekkolt = 0;
    inputok.forEach((item, index) => {
        todos[index].isCompleted = item.checked;
        if (item.checked ? becsekkolt++ : ""); 
        szamolasok();
        });
    }

    const ertekId = document.getElementById("ertek");
    let osszDb = checkboxok.length;
    ertekId.innerText = szazalekSzamitas(osszDb, becsekkolt) + " %"; 
};