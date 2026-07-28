import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <main>
      <ul>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </main>
  );
}

export default TodoList;
