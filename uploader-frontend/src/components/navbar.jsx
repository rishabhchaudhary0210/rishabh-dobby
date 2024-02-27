import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/use-auth-context";

const Navbar = () => {

    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();

    const HandleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("jwt");
        navigate("/");
    }

    return (
        <div className="w-full flex items-center justify-end px-4 mt-4">
            {
                !user ?
                    <div className="flex justify-center items-center gap-x-4">
                        <Link to="/auth/log-in"
                            className="px-4 py-1 border border-indigo-600 text-indigo-600 text-md rounded-md bg-white hover:bg-zinc-100"
                        >
                            Log-In
                        </Link>
                        <span>or</span>
                        <Link to='/auth/sign-up'
                            className="px-4 py-1 border border-indigo-600 bg-indigo-600 text-md rounded-md text-white hover:bg-indigo-700"
                        >
                            Sign-Up
                        </Link>
                    </div>
                    :
                    <div className="">
                        <button
                            className="px-4 py-1 border border-indigo-600 text-indigo-600 text-md rounded-md bg-white hover:bg-zinc-100"
                            onClick={HandleLogout}>
                            Log-Out
                        </button>
                    </div>
            }
        </div>
    )
}

export default Navbar