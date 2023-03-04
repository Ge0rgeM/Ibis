let USERS = JSON.parse(localStorage.getItem("list"));
function get() {
    localStorage.getItem("Users");
}
let a = localStorage.getItem("Users");
function getUser() {
    const name = document.getElementsByClassName('nameDiv')[0].children[0].value;
    const surname = document.getElementsByClassName('surnameDiv')[0].children[0].value;
    let q = {
        login:name,
        Password:surname
    };
    USERS.push(q);
    localStorage.setItem("list",JSON.stringify(USERS));
}
function allUsers() {
    let list = JSON.parse(localStorage.getItem("list"));
    for(let i=0;i<list.length;i++) {
        console.log(list[i].login,list[i].Password);
    }
}