console.log("Connected to JS");

let textarea1 = document.getElementById("textarea1");
let addNote = document.getElementById("addNote");
let noteContent = document.getElementById("noteContent");
let notesObj = [];
let notes;
let savedNotes = document.getElementById("savedNotes");
let searchNote = document.getElementById("searchNote");
let notesDiv;

showList();         //to show list On Load

addNote.addEventListener("click", function () {
    notes = localStorage.getItem("Notes");

    if (notes != null) {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(textarea1.value);
    localStorage.setItem("Notes", JSON.stringify(notesObj));
    textarea1.value = "";
    document.getElementById("textAnim").classList.remove("active");
    showList();
});

function showList() {
    notes = localStorage.getItem("Notes");

    if (notes != null) {
        notesObj = JSON.parse(notes);
    }

    let tempHTML = "";
    notesObj.forEach(function (currentValue, index) {
        tempHTML += `<div class="row notesDiv">
        <div class="col s5 push-s3">
          <div class="card black">
            <div class="card-content white-text">
              <span class="card-title">Note ${index + 1}</span>
              <p class="flow-text" id="noteContent">${currentValue}</p>
            </div>
            <div class="card-action">
              <button class="waves-effect waves-light grey btn" onclick="delSelection(this.index)">Delete</button>
            </div>
          </div>
        </div>
      </div>`
    });

    if (notesObj.length != 0) {
        savedNotes.innerHTML = tempHTML;
    } else {
        savedNotes.innerHTML = `<p class="white-text flow-text">No Notes Added Yet</p>`
    }
}


function delSelection(index) {
    if (notes != null) {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(notesObj));
    showList();
}


searchNote.addEventListener("input", function () {
    // console.log(searchNote.value);
    notesDiv = document.getElementsByClassName("notesDiv");

    Array.from(notesDiv).forEach(function (currentValue) {
        let cardTxt = currentValue.getElementsByTagName("p")[0].innerText.toLowerCase();
        // console.log(cardTxt);
        if (cardTxt.includes(searchNote.value.toLowerCase())) {
            currentValue.style.display = "block";
        } else {
            currentValue.style.display = "none";
        }
    });

});













