import Validate from "../utils/Validate";
import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Form = () => {
  const [isSignUpMode, setisSignUpMode] = useState(false);
  const [IsErrorMessg, setErrorMssg] = useState<string | null>(null);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const signupCLickHandler = () => {
    setisSignUpMode(!isSignUpMode);
    setErrorMssg(null);
  };

  const guestLoginHandler = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "demo@cineai.com",
        "Demo@123"
      );
    } catch (error: any) {
      setErrorMssg(error.message);
    }
  };

  const submitbtnCLickHandler = async () => {
    const ErrorMessg = Validate(
      email.current?.value || "",
      password.current?.value || ""
    );

    setErrorMssg(ErrorMessg);

    if (ErrorMessg !== null) return;

    try {
      if (isSignUpMode) {
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email.current!.value,
            password.current!.value
          );

        await updateProfile(userCredential.user, {
          displayName: name.current?.value,
        });
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current!.value,
          password.current!.value
        );
      }
    } catch (error: any) {
      setErrorMssg(error.code + " - " + error.message);
    }
  };

  return (
    <form
      className="w-[90%] z-50 sm:w-[380px] bg-black/80 p-6 sm:p-10 mt-5 mb-5 rounded-md text-white shadow-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        {isSignUpMode ? "Sign Up" : "Sign In"}
      </h2>

      {isSignUpMode && (
        <input
          ref={name}
          type="text"
          placeholder="Name"
          className="w-full mb-4 rounded bg-zinc-800 px-4 py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
        />
      )}

      <input
        ref={email}
        type="email"
        placeholder="Email address"
        defaultValue={!isSignUpMode ? "demo@cineai.com" : ""}
        className="w-full mb-4 rounded bg-zinc-800 px-4 py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
      />

      <input
        ref={password}
        type="password"
        placeholder="Password"
        defaultValue={!isSignUpMode ? "Demo@123" : ""}
        className="w-full mb-4 rounded bg-zinc-800 px-4 py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
      />

      <button
        type="button"
        onClick={submitbtnCLickHandler}
        className="w-full rounded bg-red-600 py-3 text-sm sm:text-base font-bold hover:bg-red-700 transition"
      >
        {isSignUpMode ? "Sign Up" : "Sign In"}
      </button>

      {IsErrorMessg && (
        <p className="text-red-500 font-bold mt-3">
          {IsErrorMessg}
        </p>
      )}

      <p className="my-4 text-center text-sm text-gray-400">
        OR
      </p>

      {!isSignUpMode && (
        <button
          type="button"
          onClick={guestLoginHandler}
          className="w-full rounded bg-green-600 py-3 font-semibold hover:bg-green-700 transition"
        >
          🚀 Guest Login
        </button>
      )}

      <p className="mt-4 cursor-pointer text-sm hover:underline">
        Forgot password?
      </p>

      <p className="mt-6 text-sm text-gray-400">
        New to CineAI?{" "}
        <button
          type="button"
          onClick={signupCLickHandler}
          className="cursor-pointer text-white hover:underline"
        >
          {isSignUpMode ? "Sign In now" : "Sign up now"}
        </button>
      </p>

      <p className="mt-4 text-xs text-gray-500">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
        <span className="cursor-pointer text-blue-500 hover:underline">
          {" "}
          Learn more
        </span>
      </p>
    </form>
  );
};

export default Form;