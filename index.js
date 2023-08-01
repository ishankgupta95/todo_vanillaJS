//Grab all DOM elements
const todoTitleInput = document.querySelector('.todo_title')
const submit_todo = document.querySelector('#submit_todo')
const todoList = document.querySelector('.todo_list')
const todo = document.querySelectorAll('.todo')

//Fetch todos
const fetch_todo = () => {
    fetch('http://localhost:3000/todos', {
        method: 'GET',
    }).then((response) => response.json())
      .then((json) => {
        let todos = [];
        todos = json;
        console.log(todos);

        todos.map(todo => {
            const todoLi = document.createElement('li')
            todoLi.classList = 'todo'

            const todoTitle = document.createElement('h4')
            todoTitle.classList = 'todo_title'
            todoTitle.innerHTML = todo.title

            todoLi.appendChild(todoTitle)

            todoList.appendChild(todoLi)

        })
    })
}

fetch_todo()

//Submit Todo
submit_todo.addEventListener('click', () => {
    
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
      .then((json) => console.log(json))

    const todoLi = document.createElement('li')
    todoLi.classList = 'todo'

    const todoTitle = document.createElement('h4')
    todoTitle.classList = 'todo_title'
    todoTitle.innerHTML = todoTitleInput.value

    todoLi.appendChild(todoTitle)

    todoList.appendChild(todoLi)
})

