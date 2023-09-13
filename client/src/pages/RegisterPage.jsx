import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { useAuthContext } from '@/context/AuthContext';

export const RegisterPage = () => {
  const { signUp, errors: registerErrors } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit(signUp);

  return (
    <div className="w-full max-w-md rounded-md bg-zinc-800 p-10">
      <h2 className="mb-4 text-center text-2xl font-bold">Register</h2>
      <ErrorMessage errors={registerErrors} />

      <form className="flex flex-col gap-4" {...{ onSubmit }}>
        <input
          type="text"
          {...register('username', { required: true })}
          className="w-full rounded-md border-2 border-transparent bg-zinc-700 px-4 py-2 outline-none focus:border-sky-600"
          placeholder="Username"
        />
        {errors.username && <p className="text-red-500">Username is required</p>}
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full rounded-md border-2 border-transparent bg-zinc-700 px-4 py-2 outline-none focus:border-sky-600"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <input
          type="password"
          {...register('password', { required: true })}
          autoComplete="true"
          className="w-full rounded-md border-2 border-transparent bg-zinc-700 px-4 py-2 outline-none focus:border-sky-600"
          placeholder="Password"
        />
        {errors.password && <p className="text-red-500">Password is required</p>}
        <button className="rounded-md bg-sky-600 py-2 transition-colors hover:bg-sky-700" type="submit">
          Register
        </button>
      </form>

      <p className="flex items-center justify-between gap-x-2 mt-8">
        Do you have an account?{' '}
        <Link className="text-sky-400 hover:underline" to="/login">
          Sign In
        </Link>
      </p>
    </div>
  );
};
