import { memo } from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '@/utils';

export const TaskCard = memo(({ _id, title, description, date, handleDeleteTask }) => (
  <Link
    key={_id}
    className="relative flex h-max flex-col gap-2 rounded-md bg-zinc-700 p-8 transition-colors hover:bg-zinc-600"
    to={`/task/${_id}`}
  >
    <button
      className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-sm transition-colors hover:bg-red-600"
      onClick={handleDeleteTask(_id)}
    >
      Delete
    </button>
    <h2 className="text-2xl font-bold">{title}</h2>
    <p>{description}</p>
    <p>{formatDate(date, 'DD/MM/YYYY hh:mm')}</p>
  </Link>
));
