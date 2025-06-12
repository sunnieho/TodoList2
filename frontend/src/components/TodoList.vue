<template>
    <div class="todo-list">
        <h1>Todo List</h1>
        <form @submit.prevent="addTodo">
            <input v-model="newTodo" placeholder="input your todo">
            <button type="submit">Add</button>
        </form>
        <ul>
            <li v-for="(todo, index) in todos" :key="index">
                {{ todo.text }}
                <button @click="deleteTodo(index)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
            newTodo: ''
        }
    },
    async mounted() {
        try {
            const response = await fetch('http://localhost:3000/api/todos');
            this.todos = await response.json();
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    },
    methods: {
        async addTodo() {
            if (this.newTodo.trim()) {
                try {
                    const response = await fetch('http://localhost:3000/api/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ newTodo: this.newTodo })
                    });
                    this.todos = await response.json();
                    this.newTodo = '';
                } catch (error) {
                    console.error('Error adding todo:', error);
                }
            }
        },
        async deleteTodo(index) {
            try {
                const response = await fetch('http://localhost:3000/api/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ index })
                });
                this.todos = await response.json();
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    }
}
</script>

<style scoped>
.todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #eee;
}
</style>