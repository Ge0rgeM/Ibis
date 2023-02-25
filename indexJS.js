// GLOBAL
const menus={
    'firstMenu':addFirstMenu(),
    'secondMenu':addSecondMenu()
};
let costs={ // All produvts and their costs
    'Americano': 5,
    'Espresso': 5,
    'Double Espresso': 6,
    'Latte': 6,
    'Cappuccino': 6,
    'Hot Chocolate': 8,
    'Tea': 4,
    'Milk': 3,
    'Snickers': 5,
    'GreenApple': 5,
    'FuseIceTea': 5,
    'SparklingWater': 4,
    'Sprite': 5,
    'CocaCola': 5,
    'RedBull': 9
};

function Menu(name,quantity,cost) { // To make menu list quickly
    this.name=name;
    this.quantity=quantity;
    this.cost=cost;
}
function addListing(name,type) {
    let list='<div class="eachLabel">'+
                        '<label for="'+name+'"><input type="checkbox" name="'+type+'" id="'+name+'">'+name+'</label>'+
                        '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
                    '</div>';
    return list;
}
// GLOBAL

// START 
document.getElementById('list').innerHTML=menus.firstMenu;
dragElement(document.getElementById("toMove"));
changeQuantity();
uncheckDefault();
// START 



// Main Program !-------------------------------
function menuChangeJS() {
    let current = document.getElementById('menuName');
    let menuToChange=document.getElementById('list');
    if(current.innerHTML=='First Menu'){
        menuToChange.innerHTML=menus.secondMenu;
        current.innerHTML="Second Menu";
    }else {
        current.innerHTML="First Menu";
        menuToChange.innerHTML=menus.firstMenu;
    }
    changeQuantity(); // To refresh all of them
    uncheckDefault(); // To refresh all of them
}
function uncheckDefault() { // if checked one is unchecked, makes it's quantity to DEFAULT;
    let quantities = document.getElementsByClassName('quantity');
    let checked = document.querySelectorAll('input[type=checkbox]');
    for(let i=0;i<checked.length;i++){
        checked[i].addEventListener('click',function() {
            if(!checked[i].checked){
                quantities[i].innerHTML=1;
            }
        });
    }
}
function changeQuantity() { // function for functioning plus/minus signs
    let wholeListPlus = document.getElementsByClassName('plus');
    let wholeListMinus = document.getElementsByClassName('minus');
    let quantities = document.getElementsByClassName('quantity');
    for(let i=0;i<wholeListPlus.length;i++) {
        wholeListPlus[i].addEventListener('click',function(){
            let checked = document.querySelectorAll('input[type=checkbox]');
            if(checked[i].checked){
                let num = parseInt(quantities[i].innerHTML);
                quantities[i].innerHTML=num+1;
            }
        });
        wholeListMinus[i].addEventListener('click',function(){
            let checked = document.querySelectorAll('input[type=checkbox]');
            if(checked[i].checked){
                let num = parseInt(quantities[i].innerHTML);
                if(num-1>0){
                    quantities[i].innerHTML=num-1;
                }
            }
        });
    }
}
function getCheckedInfo() {
    let list = document.querySelectorAll("input[type=checkbox]");
    let labels = document.querySelectorAll('label');
    let quantities = document.getElementsByClassName('quantity');
    let menulist = []; // to Store main menu's list of products,quantities and costs;
    for(let i=0;i<list.length;i++) {
        if(list[i].checked){ // store ONLY if it's checked
            let name = labels[i].textContent;
            let quantity = parseInt(quantities[i].textContent);
            let cost = costs[name];
            menulist.push(new Menu(name,quantity,cost));
            quantities[i].innerHTML=1; // make it again DEFAULT
            list[i].checked=false; // make it again DEFAULT
        }
    }
    addMenu(menulist); // pass it to menu adding function;
}
function checkMenuValid(menu) { // if Menu is empty return 0 else 1+
    return menu.length;   
}
function addMenu(menulist) {
    if(!checkMenuValid(menulist)){
        alert("Menu Is Empty !");
        return;
    }
    let menusCount=document.getElementsByClassName('addedMenu').length; // to know how many added menus we already have
    let totalcost = 0; // variable for storing total value
    let body = document.querySelectorAll('body');
    body[0].innerHTML+=addMenuJSDiv(); // adding new Menu Template (JUST);
    let toUpdate='';// to store which menu we need to update
    for(let i=0;i<menulist.length;i++) {
        toUpdate=document.getElementsByClassName('listOfEachProductDiv')[menusCount];
        updateMenuDiv(toUpdate,menulist[i].name,menulist[i].quantity,menulist[i].cost,''); // pass function all details which we need to update;
        totalcost+=menulist[i].cost*menulist[i].quantity; // product price * procuct quantity;
    }
    toUpdate=document.getElementsByClassName('totalPrice')[menusCount];
    updateMenuDiv(toUpdate,'','','',totalcost); // update ONLY total cost

    addedMenuBoardResizer(document.getElementsByClassName('menuList')[menusCount]);

    for(let i=0;i<=menusCount;i++)  // To refresh all of them
        dragElementMenu(document.getElementsByClassName('menuToMove')[i]);
    dragElement(document.getElementById("toMove"));  // To refresh
    changeQuantity(); // To refresh all of them
    uncheckDefault(); // To refresh all of them
    checkToRemoveMenu(document.getElementsByClassName('menuCheck')); // do EVERY TIME since we are deleting some of them
}
function checkToRemoveMenu(menuCheckList) {//Add onclick function to every added menu's buton so if it's clicked delete it
    for(let i=0;i<menuCheckList.length;i++) {
        menuCheckList[i].onclick = function() {
            this.parentNode.parentNode.parentNode.remove(); // three parent nodes, so we delete whole menu 
        }
    }
}
// Main Program -------------------------------!


//Others !-------------------------------
function updateMenuDiv(div,name,number,cost,total){
    if(name!=''){
        div.innerHTML+=
        '<div class="eachProductDiv">'+
            '<div class="productName">'+name+'</div>'+
            '<div class="productN">'+number+'</div>'+
            '<div class="productCost">'+cost+' Gel</div>'+
        '</div>';
    }else {
        div.innerHTML=total+" Gel";
    }
}
function addMenuJSDiv(){ // Pre-made function for empty Menu(added) div; 
    let stringForDiv='<div class="addedMenu menuToMove">'+
        '<div class="menuList">'+
        '<div class="menuMoveIcon menuToMoveHeader">D r a g</div>'+
        '<div class="listNames"><div class="product">Product</div><div class="number">Number</div><div class="cost">cost</div></div>'+
        '<div class="listOfEachProductDiv"></div>'+
        '<div class="totalPriceDiv"><span class="totalPriceText">Total:</span><div class="totalPrice"></div></div>'+
        '<div id="menuButton"><button class="menuCheck">Checked</button></div>'+
        '</div>'+
        '</div>';
    return stringForDiv;
}
function addedMenuBoardResizer(element) {
    const wholeContainerH = element.offsetHeight;
    const wholeContainerW = element.offsetWidth;
    element.parentNode.style.height=wholeContainerH+7+'px';
    element.parentNode.style.width=wholeContainerW+5+'px';
}
function addFirstMenu() {
    let firMenuHTML=addListing('Americano','baverage');
    firMenuHTML+=addListing('Espresso','baverage');
    firMenuHTML+=addListing('DoubleEspresso','baverage');
    firMenuHTML+=addListing('Latte','baverage');
    firMenuHTML+=addListing('Cappuccino','baverage');
    firMenuHTML+=addListing('HotChocolate','baverage');
    firMenuHTML+=addListing('Tea','baverage');
    firMenuHTML+=addListing('Milk','baverage');
    return firMenuHTML;
}
function addSecondMenu() {
    let secMenuHTML=addListing('Snickers','food');
    secMenuHTML+=addListing('GreenApple','food');
    secMenuHTML+=addListing('FuseIceTea','baverage');
    secMenuHTML+=addListing('SparklingWater','baverage');
    secMenuHTML+=addListing('Sprite','baverage');
    secMenuHTML+=addListing('CocaCola','baverage');
    secMenuHTML+=addListing('RedBull','baverage');
    return secMenuHTML;
}
//Others -------------------------------!


// Functions for Dragging Main and added Menu !-------------------------------
function dragElement(element) {
    let pos1=0,pos2=0,pos3=0,pos4=0;
    document.getElementById(element.id + "Header").onmousedown = dragMouseDown; // if clicked on header
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function dragElementMenu(element) {
    let pos1=0,pos2=0,pos3=0,pos4=0;
    element.onmousedown = dragMouseDown; // if clicked on header
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
// Functions for Dragging Main and added Menu -------------------------------!



/* let firMenuHTML='<div class="eachLabel">'+
                '<label for="Americano"><input type="checkbox" name="baverage" id="Americano">Americano</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="Espresso"><input type="checkbox" name="baverage" id="Espresso">Espresso</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="DoubleEspresso"><input type="checkbox" name="baverage" id="DoubleEspresso">Double Espresso</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="Latte"><input type="checkbox" name="baverage" id="Latte">Latte</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="Cappuccino"><input type="checkbox" name="baverage" id="Cappuccino">Cappuccino</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="HotChocolate"><input type="checkbox" name="baverage" id="HotChocolate">Hot Chocolate</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="Tea"><input type="checkbox" name="baverage" id="Tea">Tea</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'+
            '<div class="eachLabel">'+
                '<label for="Milk"><input type="checkbox" name="baverage" id="Milk">Milk</label>'+
                '<div class="count"><div class="minus"><img src="./minus.png" alt=""></div><span class="quantity">1</span><div class="plus"><img src="./plus.png" alt=""></div></div>'+
            '</div>'; */