import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  MAX_TODO_TITLE_LENGTH,
} from '../../../utils/todoValidation.js';

function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [isDeleteConfirming, setIsDeleteConfirming] =
    useState(false);

  const [workingTitle, setWorkingTitle] =
    useState(todo.title);

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

  function handleDeleteCancel() {
    setIsDeleteConfirming(false);
  }

  function handleDeleteConfirm() {
    setIsDeleteConfirming(false);
    onDeleteTodo(todo.id);
  }

  return (
    <li className="todo-item">
      <form
        className="todo-item-form"
        onSubmit={handleUpdate}
      >
        {isEditing ? (
          <div className="todo-edit-mode">
            <TextInputWithLabel
              elementId={`todoTitle${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              maxLength={MAX_TODO_TITLE_LENGTH}
              onChange={handleEdit}
            />

            <div className="todo-edit-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="primary-button todo-action-button"
                type="submit"
                disabled={
                  !isValidTodoTitle(
                    workingTitle
                  )
                }
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-item-content">
            <div className="todo-main">
              <input
                className="todo-checkbox"
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() =>
                  onCompleteTodo(todo.id)
                }
              />

              <label
                className={
                  todo.isCompleted
                    ? 'todo-title completed'
                    : 'todo-title'
                }
                htmlFor={`checkbox${todo.id}`}
              >
                {todo.title}
              </label>
            </div>

            <div className="todo-item-actions">
              <button
                className="secondary-button todo-action-button"
                type="button"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Edit
              </button>

              <button
                className="danger-button"
                type="button"
                onClick={() =>
                  setIsDeleteConfirming(true)
                }
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </form>

      {isDeleteConfirming && (
        <div
          className="delete-dialog-backdrop"
          role="presentation"
          onClick={handleDeleteCancel}
        >
          <div
            className="delete-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${todo.id}`}
            aria-describedby={`delete-description-${todo.id}`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="delete-dialog-icon">
              !
            </div>

            <h2
              id={`delete-title-${todo.id}`}
            >
              Delete todo?
            </h2>

            <p
              id={`delete-description-${todo.id}`}
            >
              Are you sure you want to delete
              <strong> "{todo.title}"</strong>?
              This action cannot be undone.
            </p>

            <div className="delete-dialog-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>

              <button
                className="danger-button"
                type="button"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoListItem;