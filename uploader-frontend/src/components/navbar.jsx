import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/use-auth-context";

const Navbar = () => {

    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const HandleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("jwt");
        navigate("/");
    }

    return (
        <div className="w-full flex items-center justify-end px-4 mt-4">
            {
                <div className="flex justify-center items-center gap-x-4">
                    {location.pathname !== "/" && <Link to={"/"} className="text-md rounded-md text-indigo-600 hover:bg-indigo-100  px-4 py-1  ">
                        Home
                    </Link>}
                    {!user ?
                    <>
                        {location.pathname !== "/auth/sign-up" && <Link to='/auth/sign-up'
                            className="px-4 py-1 border border-indigo-600 bg-indigo-600 text-md rounded-md text-white hover:bg-indigo-700"
                        >
                            Sign-Up
                        </Link>}
                        {location.pathname !== "/auth/log-in" && <Link to="/auth/log-in"
                            className="px-4 py-1 border border-indigo-600 text-indigo-600 text-md rounded-md bg-white hover:bg-zinc-100"
                        >
                            Log-In
                        </Link>}
                    </>
                    :
                    <>
                        {location.pathname !== "/user-library" && <Link to='/user-library'
                            className="px-4 py-1 border border-indigo-600 bg-indigo-600 text-md rounded-md text-white hover:bg-indigo-700"
                        >
                            Library
                        </Link>}
                        <button
                            className="px-4 py-1 border border-indigo-600 text-indigo-600 text-md rounded-md bg-white hover:bg-zinc-100"
                            onClick={HandleLogout}>
                            Log-Out
                        </button>
                    </>}
                </div>

            }
        </div>
    )
}

export default Navbar