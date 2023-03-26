import Button  from 'components/Button';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from "routes/paths";
import useAuth from "stores/useAuth";

const NavBar = () => {
  const {isAuthenticated, logout } = useAuth();

  return (
    <div className="flex p-6 items-center justify-between">
      <h3 className=" text-white px-5 py-2 headerCustom font-[Roboto]">
        <Link to="/">
          de<span className="text-primary">COM</span>
        </Link>
      </h3>
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          className=" text-white rounded-md px-3 py-2 text-sm font-medium mx-5"
          aria-current="page"
        >
          Home
        </Link>
        <Link
          to={"/manufacturer"}
          className=" text-white rounded-md px-3 py-2 text-sm font-medium mx-5"
          aria-current="page"
        >
          Manufacturer
        </Link>
        <Link
          to={"/marketplace"}
          className=" text-white rounded-md px-3 py-2 text-sm font-medium mx-5"
          aria-current="page"
        >
          Marketplace
        </Link>
      </div>
      <div className="flex">
        {isAuthenticated ?
        (
          <Button 
            className="text-white bg-primary"
            onClick={() => logout()}
          >
            Log out
          </Button>
        )
        :
        (
          <>
          <Link to={PATH_AUTH.register}>
            <Button className="text-white rounded-md px-3 py-2 text-sm font-medium border border-primary">
              Sign Up
            </Button>
          </Link>
          <Link to={PATH_AUTH.login}>
            <Button className="text-white bg-primary">Sign In</Button>
          </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
