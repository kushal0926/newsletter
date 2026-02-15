import { useState, type ChangeEventHandler } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setEmail(target.value);
  };

  const handleSignup = () => {
    if (!email) return;

    console.log("signup clicked!");
  };

  return (
    <section>
      <div className="text-center text-4xl font-bold m-5 mb-10 text-cream">
        <h1>
          welcome to the {""}
          <span>newsletter service</span>
        </h1>
        <p>sign-up below to be the first to get notified!</p>
      </div>

      <div className="flex flex-col text-center justify-center">
        <div className="flex mt-2 justify-center items-end">
          {/*<div className="flex flex-col">
            <span className="text-gray-700 text-sm text-start mb-2 text-opacity-70">
              SignUp with your email address
            </span>
            <span className="text-red-600 text-sm text-start mb-1 text-opacity-70">
              {errorMessage}
            </span>
          </div>*/}
          <form className="relative flex items-center bg-[#121212] rounded border border-white/5 mt-6 text-sm max-w-md w-full">
            <svg
              className="absolute left-3"
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 6 9.505 8.865a1 1 0 0 1-1.005 0L4 6"
                stroke="#90A1B9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.3 1H2.7C1.761 1 1 1.84 1 2.875v11.25C1 15.161 1.761 16 2.7 16h13.6c.939 0 1.7-.84 1.7-1.875V2.875C18 1.839 17.239 1 16.3 1"
                stroke="#90A1B9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              value={email}
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleEmailChange}
              className="focus:outline-none pl-10 py-5 bg-[#121212] w-full placeholder-gray-500 y-50 font-bold text-gray-500"
              required
            />
            <button
              className="shrink-0 mr-2 px-6 py-3 text-sm bg-cream rounded-md active:scale-95  transition duration-300 text-ink font-bold"
              onClick={handleSignup}
            >
              Signup Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
