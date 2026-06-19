import { useState } from "react";
import Header from "./Header";
import { CineAIbg } from "../utils/constants";
import Form from "./Form";

const LandingPage = () => {
  const [IsSignIn, setIsSignIn] = useState(false);

  const signinHandler = () => {
    setIsSignIn(!IsSignIn);
  };

  return (
    <div className="relative h-screen w-full">
      <Header signinHandler={signinHandler} />

      <img
        src={CineAIbg}
        alt="CineAIBg"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {!IsSignIn ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-2xl text-white">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold px-4">
              Unlimited movies,
              <br />
              shows, and more
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg font-bold">
              Starts at ₹149. Cancel at any time.
            </p>

            <p className="mt-6 text-sm sm:text-base px-4">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 px-4">
              <input
                placeholder="Email address"
                className="flex-1 rounded bg-zinc-900 bg-opacity-80 px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
              />
              <button className="rounded bg-red-600 px-6 py-2.5 sm:py-3 text-sm sm:text-lg font-bold hover:bg-red-700">
                Get Started ▶️
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Form />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
