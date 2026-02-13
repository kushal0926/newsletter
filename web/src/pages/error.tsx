import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: "#1c1917" }}
    >
      <FiAlertCircle className="text-amber-50 text-9xl mb-6 animate-pulse" />

      {isRouteErrorResponse(error) ? (
        <>
          <h1 className="text-6xl font-extrabold text-amber-50 mb-2">
            {error.status}
          </h1>
          <h2 className="text-2xl font-semibold text-amber-50 mb-4">
            {error.statusText}
          </h2>
        </>
      ) : error instanceof Error ? (
        <>
          <h1 className="text-4xl font-bold text-amber-50 mb-4">
            Oops! Something went wrong.
          </h1>
        </>
      ) : (
        <h1 className="text-4xl font-bold text-amber-50 mb-4">Unknown Error</h1>
      )}

      <button
        onClick={goHome}
        className="mt-8 px-6 py-3 bg-amber-50 hover:bg-gray-400 text-[#1c1917] font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
}
