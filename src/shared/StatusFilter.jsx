import { useSearchParams } from 'react-router';

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (event) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newStatus = event.target.value;

    if (newStatus === 'all') {
      newSearchParams.delete('status');
    } else {
      newSearchParams.set('status', newStatus);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <label htmlFor="status-filter">Filter by status: </label>

      <select
        id="status-filter"
        value={currentStatus}
        onChange={handleStatusChange}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default StatusFilter;