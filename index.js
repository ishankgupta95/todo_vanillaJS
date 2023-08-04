//Grab all DOM elements
const todoTitleInput = document.querySelector('.todo_title')
const todoList = document.querySelector('.todo_list')
const todo = document.querySelectorAll('.todo')

//Fetch todos
const fetchTodo = () => {
    fetch('http://localhost:3000/todos', {
        method: 'GET',
    }).then((response) => response.json())
      .then((json) => {
        let todos = [];
        todos = json;
        console.log(todos);

        todos.map(todo => {
            addTodoToUI(todo.id, todo.title, todo.done)
        })
    })
}

fetchTodo()

//Submit Todo
todoTitleInput.addEventListener('keypress', (e) => {

    if (e.key === "Enter") {
        e.preventDefault();

        fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: todoTitleInput.value,
            done: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
        }).then((response) => response.json())
        .then((todo) => addTodoToUI(todo.id, todo.title, todo.done))
    }
})

// add todo to UI
const addTodoToUI = (id, title, done) => {
    const todoLi = document.createElement('li')
    todoLi.classList = 'todo'

    const todoTitle = document.createElement('p')
    todoTitle.classList = 'todo_title'
    todoTitle.innerHTML = title

    const checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList = 'todo-checkbox'
    checkBox.checked = done

    if(done) {
        todoLi.classList.add('done')
    }

    todoLi.appendChild(checkBox)
    todoLi.appendChild(todoTitle)

    todoList.appendChild(todoLi)
    todoTitleInput.value = ''

    checkBox.addEventListener('click', (event) => {
        event.target.parentElement.classList.toggle('done')
        if(checkBox.checked){
            done = true
        } else {
            done = false
        }
        updateTodo(id, title, done)
    })
}

const updateTodo = (id, title, done) => {
    fetch('http://localhost:3000/todos/'+id, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            done: done
        }),
        headers: {
            'Content-type': 'application/json'
        }
        }).then((response) => response.json())
        .then((json) => console.log(json))
}


