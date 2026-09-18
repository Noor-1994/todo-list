export const MAX_TODO_TITLE_LENGTH = 100;

export function isValidTodoTitle(title) {
  if (typeof title !== 'string') {
    return false;
  }

  const trimmedTitle = title.trim();

  return (
    trimmedTitle.length > 0 &&
    trimmedTitle.length <= MAX_TODO_TITLE_LENGTH
  );
}