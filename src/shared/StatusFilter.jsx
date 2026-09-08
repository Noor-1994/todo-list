import { useSearchParams } from 'react-router';

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status') || 'all';

  function handleStatusChange(event) {
    const newStatus = event.target.value;

    if (newStatus === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', newStatus);
    }

    setSearchParams(searchParams);
  }

  return (
    <label>
      Status:
      <select value={status} onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </label>
  );
}

export default StatusFilter;