import Page from 'components/Page';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from 'routes/paths';

const ResetPassword = () => {
  return (
    <Page title="Register">
      <div className="min-h-full flex flex-col items-center justify-center mx-auto w-full max-w-sm lg:w-96">
        <h2 className="text-3xl font-bold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
        </p>

        <div className="mt-6 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            type="submit"
            className="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Password
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-8">
          <Link
            to={PATH_AUTH.login}
            className="text-indigo-600 text-sm font-medium "
          >
            <span aria-hidden="true">&larr;</span> Return to sign in
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-900">
            Contact support
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default ResetPassword;
