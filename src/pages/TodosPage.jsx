import {
  useEffect,
  useReducer,
} from 'react';
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

  const status =
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
      } catch (error) {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== 'createdAt' ||
          sortDirection !== 'asc';

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: `Error ${
              isFilterError
                ? 'filtering/sorting todos'
                : 'fetching todos'
            }: ${error.message}`,
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
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          message: error.message,
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

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: {
        id,
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
            isCompleted: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to complete todo'
        );
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message: error.message,
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
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          editedTodo,
          originalTodo,
          message: error.message,
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

  const filteredTodoList =
    status === 'active'
      ? todoList.filter(
          (todo) => !todo.isCompleted
        )
      : status === 'completed'
        ? todoList.filter(
            (todo) => todo.isCompleted
          )
        : todoList;

  return (
    <main>
      <h1>Todos</h1>

      <StatusFilter />

      {error && (
        <div>
          <p>{error}</p>

          <button onClick={clearError}>
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={clearFilterError}>
            Clear Filter Error
          </button>

          <button onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && (
        <p>Loading...</p>
      )}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={handleSortByChange}
        onSortDirectionChange={
          handleSortDirectionChange
        }
      />

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={filteredTodoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </main>
  );
}

export default TodosPage;