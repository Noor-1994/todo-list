import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation.js';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!isValidTodoTitle(workingTitle)) {
      return;
    }

    onUpdateTodo({
      ...todo,
      title: workingTitle.trim(),
    });

    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todoTitle${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              onChange={handleEdit}
            />

            <button
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              id={`checkbox${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />

            <span
              onClick={() => setIsEditing(true)}
              style={{
                textDecoration: todo.isCompleted
                  ? 'line-through'
                  : 'none',
              }}
            >
              {todo.title}
            </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;