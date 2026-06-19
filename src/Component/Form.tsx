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
  const [IsSubmit, setIsSubmit] = useState(false);
  const [IsErrorMessg, setErrorMssg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const signupCLickHandler = () => {
    setisSignUpMode(!isSignUpMode);
  };
  const submitbtnCLickHandler = () => {
    setIsSubmit(!IsSubmit);
    const ErrorMessg = Validate(email.current.value, password.current.value);
    setErrorMssg(ErrorMessg);
    // console.log(email.current.value);
    // console.log(password.current.value);

    if (ErrorMessg === null) {
      if (isSignUpMode) {
        // sign up logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // console.log(user);

            //updating the user
            updateProfile(user, {
              displayName: name.current.value,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMssg(errorCode + "-" + errorMessage);
            // ..
          });
      } else {
        // sign in logic
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMssg(errorCode + "-" + errorMessage);
          });
      }
    }
  };
  return (
    <form
      className="w-[90%] sm:w-[380px] bg-black/80 p-6 sm:p-10 mt-5 mb-5 rounded-md text-white shadow-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      {!isSignUpMode ? (
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Sign In</h2>
      ) : (
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Sign Up</h2>
      )}
      {isSignUpMode && (
        <input
          ref={name}
          type="text"
          placeholder="Name"
          className="w-full mb-4 rounded bg-zinc-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
        />
      )}
      {/* email */}
      <input
        ref={email}
        type="email"
        placeholder="Email address"
        className="w-full mb-4 rounded bg-zinc-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
      />

      {/* password */}
      <input
        ref={password}
        type="password"
        placeholder="Password"
        className="w-full mb-4 rounded bg-zinc-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
      />

      {/* sign In button */}
      <button
        onClick={submitbtnCLickHandler}
        className="w-full rounded bg-red-600 py-2.5 sm:py-3 text-sm sm:text-base font-bold hover:bg-red-700 transition"
      >
        {!isSignUpMode ? "Sign In" : "Sign Up"}
      </button>
      <p className="text-red-500 font-bold m-2">{IsErrorMessg}</p>

      {/* OR */}
      <p className="my-4 text-center text-sm text-gray-400">OR</p>

      {/* Sign-in code */}
      <button className="w-full rounded bg-zinc-700 py-3 font-semibold hover:bg-zinc-600 transition">
        Use a sign-in code
      </button>

      {/* links */}
      <p className="mt-4 cursor-pointer text-sm hover:underline">
        Forgot password?
      </p>

      <p className="mt-6 text-sm text-gray-400">
        New to CineAI?{" "}
        <button
          onClick={signupCLickHandler}
          className="cursor-pointer text-white hover:underline"
        >
          Sign up now
        </button>
      </p>

      <p className="mt-4 text-xs text-gray-500">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
        <span className="cursor-pointer text-blue-500 hover:underline">
          Learn more
        </span>
      </p>
    </form>
  );
};

export default Form;
