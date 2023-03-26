import { onVerifyEmail } from 'api/auth';
import Page from 'components/Page';
import { useLocation } from 'react-router-dom';

const VerifyCode = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const key = params.get('key');

  return (
    <Page title="Register">
      <div className="min-h-full flex flex-col items-center justify-center mx-auto w-full max-w-sm lg:w-96">
        <h2 className="text-3xl font-bold text-gray-900">
          Activate your account
        </h2>
        <div className="mt-6 w-full">
          <button
            className="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onVerifyEmail({ key: key || '' })}
          >
            Activate
          </button>
        </div>
      </div>
    </Page>
  );
};

export default VerifyCode;
