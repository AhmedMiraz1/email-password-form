import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase.config";
import { useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  const [logInError, setLogInError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password);

    setLogInError("");
    setSuccess("");

    if (password.length < 6) {
      setLogInError("password should be at least 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setLogInError(
        "Your password should have at least one upperCase character"
      );
      return;
    } else if (!accepted) {
      setLogInError("please accept our terms and condition");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        
        console.log(result.user);
        if(result.user.emailVerified){
            setSuccess("User created successfully", result.user);
        }
        else {
            alert('please verify your email address')
        }
      })
      .catch((error) => {
        setLogInError("You'r email already used", error.message);
      });
  };

  const handelForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("forgot password", );
      return;
    }
     else if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("please write a valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then( ()=> {
        alert('please check your email');
    })
    .catch( error => {
        console.log(error);
    })
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                ref={emailRef}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <span
                className="absolute top-44 right-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>

              <div className="my-4">
                <input
                  className="mr-3"
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <label htmlFor="terms">
                  Accept our <a href="">terms condition</a>{" "}
                </label>
              </div>
              <label className="label">
                <a
                  onClick={handelForgotPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          {logInError && <p className="text-red-700">{logInError}</p>}
          {success && <p className="text-green-700">{success}</p>}

          <p>
            New to this website ? please{" "}
            <Link
              className=" text-red-600 text-2xl font-bold ml-2"
              to="/register"
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
