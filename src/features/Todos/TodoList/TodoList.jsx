import TodoListItem from './TodoListItem';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
}) {
  return (
    <main>
      {todoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </main>
  );
}

export default TodoList;