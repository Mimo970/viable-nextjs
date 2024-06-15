// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import React, { useState } from "react";
// import { MdAddPhotoAlternate } from "react-icons/md";
// import { auth, storage, db } from "../../firebase";

// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const LoginPage = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // console.log(username, email, password, file);
//     try {
//       const auth = getAuth();
//       await signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           // console.log(user);
//           router.push("/");

//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//         });
//     } catch (error) {
//       setError(true);
//     }
//   };

//   console.log(error);

//   return (
//     <div className="bg-[#192734]  text-white h-screen flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#15202b] w-96 p-6 rounded-lg shadow-xl"
//       >
//         <h2 className="text-xl font-bold mb-4">Register</h2>

//         <div className="mb-4">
//           <label htmlFor="email" className="block font-bold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border border-zinc-400 p-2 w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block font-bold mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-400 p-2 w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-[#009BF9] text-white p-2 rounded-lg hover:bg-zinc-600"
//         >
//           Sign in
//         </button>
//         <p>
//           You don't have an account?&nbsp;
//           <Link href="/register">
//             <span className="underline underline-offset-1 text-sky-600  ">
//               Register
//             </span>
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to home page on successful login
      router.push("/");
    } catch (error) {
      // Handle errors
      setError(error.message); // Set error message for display

      // Log error details for debugging
      console.error("Login Error:", error.code, error.message);
    }
  };

  return (
    <div className="bg-[#fafafa] text-black h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#fafafa] w-96 p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Sign In</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-[#009BF9] text-white p-2 rounded-lg hover:bg-zinc-600"
        >
          Sign In
        </button>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link className="underline text-sky-600" href="/register">
            Register
          </Link>
        </p>
        {error && (
          <div className="flex bg-red-500 text-white p-2 mb-4 rounded-lg  ">
            {/* {error} */}
            Invalid User Credentials
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
