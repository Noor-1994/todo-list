import { useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [newTodo, ...previous]);
  }

  function completeTodo(id) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, isCompleted: true }
        : todo
    );

    setTodoList(updatedTodoList);
  }

  function updateTodo(updatedTodo) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === updatedTodo.id
        ? updatedTodo
        : todo
    );

    setTodoList(updatedTodoList);
  }

  return (
    <div>
      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;