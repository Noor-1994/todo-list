import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  MAX_TODO_TITLE_LENGTH,
} from '../../utils/todoValidation.js';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] =
    useState('');

  function handleAddTodo(event) {
    event.preventDefault();

    if (!isValidTodoTitle(workingTodoTitle)) {
      return;
    }

    onAddTodo(workingTodoTitle.trim());
    setWorkingTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        maxLength={MAX_TODO_TITLE_LENGTH}
        onChange={(event) =>
          setWorkingTodoTitle(event.target.value)
        }
      />

      <button
        className="primary-button"
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;