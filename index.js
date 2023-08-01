//Grab all DOM elements
const todoTitleInput = document.querySelector('.todo_title')
const todoDescriptionInput = document.querySelector('.todo_description')
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

            const todoDescription = document.createElement('p')
            todoDescription.classList = 'todo_description'
            todoDescription.innerHTML = todo.description

            todoLi.appendChild(todoTitle)
            todoLi.appendChild(todoDescription)

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
            description: todoDescriptionInput.value,
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

    const todoDescription = document.createElement('p')
    todoDescription.classList = 'todo_description'
    todoDescription.innerHTML = todoDescriptionInput.value

    todoLi.appendChild(todoTitle)
    todoLi.appendChild(todoDescription)

    todoList.appendChild(todoLi)
})

