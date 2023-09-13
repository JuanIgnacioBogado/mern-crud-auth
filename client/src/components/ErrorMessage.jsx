export const ErrorMessage = ({ errors }) =>
  errors?.map(error => (
    <p key={crypto.randomUUID()} className="mb-3 rounded-md bg-red-500 p-2 text-center">
      {error}
    </p>
  ));
