var input = document.getElementById("ToDoInput");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && input.value) {
        event.preventDefault();

        var ToDo = null;
        if(localStorage.getItem('ToDoList')) {
            ToDo = JSON.parse(localStorage.getItem('ToDoList'));
        } else {
            ToDo = new Array(); 
        }

        var ToDo_el = {completed: false, id: ToDo.length, text: input.value};
        addToList(input.value, ToDo.length, 'false');
        ToDo.push(ToDo_el);

        console.log(ToDo.length)

        localStorage.setItem('ToDoList', JSON.stringify(ToDo));

        input.value = "";
    }
});

window.onload = function() {
    if(localStorage.getItem('ToDoList')) {
        var ToDo = JSON.parse(localStorage.getItem('ToDoList'));
        
        for(let i = 0; i < ToDo.length; i++) {
            addToList(ToDo[i].text, ToDo[i].id, ToDo[i].completed);
        }
    }
};

function completed (id) {
    var completed = "";
    var element = document.getElementById(id);
    if (element.getAttribute('completed') === "false") {
        completed = "true";
    } else {
        completed = "false";
    }

    var ToDo = JSON.parse(localStorage.getItem('ToDoList'));

    ToDo[ToDo.findIndex(x => x.id === id)].completed = completed;

    localStorage.setItem('ToDoList', JSON.stringify(ToDo));

    element.setAttribute('completed', completed);
}

function remove (id) {
    var element = document.getElementById(id);

    var ToDo = JSON.parse(localStorage.getItem('ToDoList'));

    ToDo.splice(ToDo.findIndex(x => x.id === id), 1);

    localStorage.setItem('ToDoList', JSON.stringify(ToDo));

    element.remove();
}

function reset (id) {
    document.getElementById(id).value = "";
}

function addToList (text, id, completed) {
    var div = document.createElement("div");
    div.id = id;
    div.className = "d-flex flex-nowrap transparent-cover justify-content-between list-el";
    div.setAttribute('completed', completed);

    htmlContent = '<p>' + text + '</p><div class="svg-icons"><div class="pointer-svg" onclick="completed(' + id + ')"><svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-dash-circle" fill="#808080" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/></svg></div><div class="pointer-svg" onclick="remove(' + id + ')"><svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-x-circle" fill="#808080" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/></svg></div></div>';

    div.innerHTML = htmlContent;

    document.getElementById('list').appendChild(div);
}