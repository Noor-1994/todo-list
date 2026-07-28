import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';

const todos = [
  { id: 1, title: 'review resources' },
  { id: 2, title: 'take notes' },
  { id: 3, title: 'code out app' },
];

function App() {
const [todoList] = useState(todos);
  return (
    <div>
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
