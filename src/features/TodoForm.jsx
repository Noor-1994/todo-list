import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();

    const trimmedTitle = workingTodoTitle.trim();

    if (!isValidTodoTitle(trimmedTitle)) {
      return;
    }

    onAddTodo(trimmedTitle);

    setWorkingTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        label="Todo"
        id="todoTitle"
        name="todoTitle"
        placeholder="Todo text"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />

      <button
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle.trim())}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;