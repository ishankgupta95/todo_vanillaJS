const todo_title = document.getElementById('todo_title');
const todo_desc = document.getElementById('todo_desc');
const submit_todo = document.getElementById('submit_todo');


submit_todo.addEventListener('click', () => {
    
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: todo_title.value,
            description: todo_desc.value,
            done: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => response.json())
      .then((json) => console.log(json))
})