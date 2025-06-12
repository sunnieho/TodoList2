const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// cors
const cors = require('cors');
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api route
app.get('/api/todos', (req, res) => {
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);
    res.json(todos);
});

// add route
app.post('/api/add', (req, res) => {
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    const newTodo = {
        text: req.body.newTodo,
        done: false,
    };

    todos.push(newTodo);
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    res.json(todos);

});


// delete route
app.post('/api/delete', (req, res) => {
    const index = parseInt(req.body.index, 10);
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    todos.splice(index, 1);
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    res.json(todos);

    console.log("Write into todos.json", todos);
})

app.get('/', (req, res) => {
    res.send('🎉 後端伺服器已啟動');
  });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
}); // 給開發者在終端機看的訊息