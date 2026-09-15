import { useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router';
import { useAuth } from '../contexts/useAuth';
import TodoForm from '../features/Todos/TodoForm';
import TodoList from '../features/Todos/TodoList/TodoList';
import SortBy from '../shared/SortBy';
import FilterInput from '../shared/FilterInput';
import StatusFilter from '../shared/StatusFilter';
import useDebounce from '../utils/useDebounce';
import {
  TODO_ACTIONS,
  initialTodoState,
  todoReducer,
} from '../reducers/todoReducer';

function TodosPage() {
  const { token } = useAuth();

  const [searchParams] = useSearchParams();

  const statusFilter =
    searchParams.get('status') || 'all';

  const [state, dispatch] = useReducer(
    todoReducer,
    initialTodoState
  );

  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(
    filterTerm,
    300
  );

  useEffect(() => {
    async function fetchTodos() {
      dispatch({
        type: TODO_ACTIONS.FETCH_START,
      });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(
          paramsObject
        );

        const response = await fetch(
          `/api/tasks?${params}`,
          {
            headers: {
              'X-CSRF-TOKEN': token,
            },
            credentials: 'include',
          }
        );

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error(
            'Failed to fetch todos'
          );
        }

        const data = await response.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {
            todos: data.tasks,
          },
        });
      } catch {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== 'createdAt' ||
          sortDirection !== 'asc';

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? 'Unable to filter or sort todos. Please try again.'
              : 'Unable to load your todos. Please try again.',
            isFilterError,
          },
        });
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [
    token,
    sortBy,
    sortDirection,
    debouncedFilterTerm,
    dataVersion,
  ]);

  function handleFilterChange(newTerm) {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: {
        filterTerm: newTerm,
      },
    });
  }

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {
        newTodo,
      },
    });

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error(
          'Failed to add todo'
        );
      }

      const data = await response.json();

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: newTodo.id,
          todo: data,
        },
      });
    } catch {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          message:
            'Unable to add this todo. Please try again.',
        },
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find(
      (todo) => todo.id === id
    );

    if (!originalTodo) {
      return;
    }

    const newCompletedStatus =
      !originalTodo.isCompleted;

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: {
        id,
        isCompleted: newCompletedStatus,
      },
    });

    try {
      const response = await fetch(
        `/api/tasks/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({
            isCompleted: newCompletedStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to update todo status'
        );
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });
    } catch {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message:
            'Unable to update this todo. Please try again.',
        },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    if (!originalTodo) {
      return;
    }

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: {
        editedTodo,
      },
    });

    try {
      const response = await fetch(
        `/api/tasks/${editedTodo.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({
            title: editedTodo.title,
            isCompleted:
              editedTodo.isCompleted,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to update todo'
        );
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      });
    } catch {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          editedTodo,
          originalTodo,
          message:
            'Unable to update this todo. Please try again.',
        },
      });
    }
  }

  async function deleteTodo(id) {
    const originalTodo = todoList.find(
      (todo) => todo.id === id
    );

    if (!originalTodo) {
      return;
    }

    dispatch({
      type: TODO_ACTIONS.DELETE_TODO_START,
      payload: {
        id,
      },
    });

    try {
      const response = await fetch(
        `/api/tasks/${id}`,
        {
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to delete todo'
        );
      }

      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_SUCCESS,
      });
    } catch {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message:
            'Unable to delete this todo. Please try again.',
        },
      });
    }
  }

  function handleSortByChange(newSortBy) {
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: {
        sortBy: newSortBy,
        sortDirection,
      },
    });
  }

  function handleSortDirectionChange(
    newSortDirection
  ) {
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: {
        sortBy,
        sortDirection: newSortDirection,
      },
    });
  }

  function clearError() {
    dispatch({
      type: TODO_ACTIONS.CLEAR_ERROR,
    });
  }

  function clearFilterError() {
    dispatch({
      type: TODO_ACTIONS.CLEAR_FILTER_ERROR,
    });
  }

  function resetFilters() {
    dispatch({
      type: TODO_ACTIONS.RESET_FILTERS,
    });
  }

  return (
    <main className="page-container todos-page">
      <section className="todos-header">
        <div>
          <p className="eyebrow">
            Stay organized
          </p>

          <h1>My Todos</h1>

          <p className="todos-description">
            Keep track of your tasks, update them,
            and stay productive.
          </p>
        </div>
      </section>

      <section
        className="todos-workspace"
        aria-label="Todo controls"
      >
        <div className="filter-grid">
          <div className="control-group">
            <StatusFilter />
          </div>

          <div className="control-group">
            <SortBy
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortByChange={
                handleSortByChange
              }
              onSortDirectionChange={
                handleSortDirectionChange
              }
            />
          </div>

          <div className="control-group control-group-wide">
            <FilterInput
              filterTerm={filterTerm}
              onFilterChange={
                handleFilterChange
              }
            />
          </div>
        </div>

        {(error || filterError) && (
          <div className="feedback-stack">
            {error && (
              <div
                className="error-message"
                role="alert"
              >
                <p>{error}</p>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={clearError}
                >
                  Clear Error
                </button>
              </div>
            )}

            {filterError && (
              <div
                className="error-message"
                role="alert"
              >
                <p>{filterError}</p>

                <div className="feedback-actions">
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={
                      clearFilterError
                    }
                  >
                    Clear Filter Error
                  </button>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {isTodoListLoading && (
          <div
            className="loading-message"
            role="status"
          >
            Loading your todos...
          </div>
        )}

        <div className="add-todo-section">
          <div>
            <h2>Add a task</h2>

            <p>
              What would you like to
              accomplish?
            </p>
          </div>

          <TodoForm
            onAddTodo={addTodo}
          />
        </div>
      </section>

      <section
        className="todo-list-section"
        aria-label="Todo list"
      >
        <div className="todo-list-header">
          <h2>Your tasks</h2>

          <span className="todo-count">
            {todoList.length}{' '}
            {todoList.length === 1
              ? 'task'
              : 'tasks'}
          </span>
        </div>

        <div className="todo-list-wrapper">
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            dataVersion={dataVersion}
            statusFilter={statusFilter}
          />
        </div>
      </section>
    </main>
  );
}

export default TodosPage;