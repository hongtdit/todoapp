let inputText = document.getElementById("input");
let todoList = [];
function save() {
    let count = todoList.length
    if(count===0)
    {
        todoList.push({id: count+1, content: inputText.value, done: false }); //them data moi vao list
    }
    else{
        todoList.push({id: todoList[count-1].id+1, content: inputText.value, done: false });
    }
    console.log(todoList);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    show(todoList);
};
function loadData() {
    todoList = JSON.parse(localStorage.getItem("todo-list"));
    if(todoList===null)
    {
        todoList=[]
    }
    else
    {
        let List = document.querySelector("#result");
        var html = todoList.map(function (item, index) {
        return `
          <tr>
                      <td>${index + 1}</td>
                      <td>${item.content}</td>
                      <td>${item.done === true ? "Finished" : "inProcess"}</td>
                      <td>
              <input  type="button" value="Edit" class="edit1" onClick=edit(${item.id})>
              <input class="delete" type="button" value="Delete" onClick=deletes(${item.id})>
              <button id="del${item.id}" class="Finish" onClick=finish(${item.id})>Finish</button></td>
                  </tr>
          `;
    });
    List.innerHTML = html.join("");
    }
    
};
loadData();
function show (listRender) {
    let List = document.querySelector("#result");
    var html = listRender.map(function (item, index) {
        return `
          <tr>
                      <td>${index + 1}</td>
                      <td>${item.content}</td>
                      <td>${item.done === true ? "Finished" : "inProcess"}</td>
                      <td>
              <input type="button" value="Edit" class="edit1" onClick=edit(${item.id})>
              <input type="button" value="Delete" class="delete"  onClick=deletes(${item.id})>
              <button id="del${item.id}" class="Finish" onClick=finish(${item.id})>Finish</button>
              </td>
                  </tr>
          `;
    });
    List.innerHTML = html.join("");
};
// tim ra phan tu theo id
let indx = null;
let result =[];
function edit (idtodolist) {
    console.log("id: ",idtodolist);
    console.log(todoList);
    for(let i=0; i<todoList.length;i++){
        if(todoList[i].id===idtodolist)
            {
                indx=i;
            }
    }
    console.log("indx: ",indx)
    let editBox = document.querySelector("#edit");
    var html = `<input id="edittext" type="text" value="" placeholder="Enter a new task here"> <input id="submit" type="button" value="Submit" onclick="submit()">`;
    editBox.innerHTML = html;
    document.getElementById("edittext").value = todoList[indx].content;
};
function submit ()  {
    let editBox = document.querySelector("#edit");
    var input = document.getElementById("edittext");
    todoList[indx].content = input.value;
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    editBox.innerHTML = '';
    show(todoList);
};
function deletes (index) {
    for(let i=0; i<todoList.length;i++){
        if(todoList[i].id===index)
            {
                indx=i;
            }
    }
    todoList.splice(indx, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    show(todoList);
};
function finish (index) {
    for(let i=0; i<todoList.length;i++){
        if(todoList[i].id===index)
            {
                indx=i;
            }
    }
    todoList[indx].done = !todoList[indx].done;
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    show(todoList);
};
function search(){
    let valueInput = document.getElementById("searchInput").value;
    console.log(valueInput);
    const filteredCharacters = todoList.filter((character) => {
        return (
            character.content.toLowerCase().includes(valueInput.toLowerCase())
        );
    });
    console.log(filteredCharacters);
    show(filteredCharacters);
  }
  
