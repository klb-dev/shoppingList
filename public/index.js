
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAdrL3Gnhn4kZNe1AI8Bqayv0mpAuoUM5o",
//     authDomain: "shoppinglist-64c58.firebaseapp.com",
//     databaseURL: "https://shoppinglist-64c58-default-rtdb.firebaseio.com",
//     projectId: "shoppinglist-64c58",
//     storageBucket: "shoppinglist-64c58.appspot.com",
//     messagingSenderId: "1090390591686",
//     appId: "1:1090390591686:web:dac27590015f4200cd6fc7"
//   };

const appSettings = {
    databaseURL: "https://shoppinglist-64c58-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "list")

const inputEl = document.getElementById("user-input")
const btnEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

btnEl.addEventListener("click", function() {
    let inputValue = inputEl.value

    push(shoppingListInDB, inputValue)

    clearInputEl()

})

onValue (shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl () 

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here...yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputEl() {
    inputEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `list/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}
