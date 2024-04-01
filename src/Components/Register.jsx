import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase.config";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";


const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log(registerError);
  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted =e.target.terms.checked
    console.log(name, email, password);

    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("password should be at least 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one upperCase character"
      );
      return;
    }
    else if(!accepted){
        setRegisterError('please accept our terms and condition')
        return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
      const user =result.user;
        setSuccess("user created successfully");
        
            updateProfile(result.user ,{
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() => console.log('profile update '))
            .catch( error => console.log(error))
        sendEmailVerification(user)
        .then(()=> {
            alert("please check your email and verify your account  ")
        })
      })
      .catch((error) => {
        setRegisterError('Your email already used', error.message);
      });
  };
  return (
    <div className="text-center my-48 bg-slate-200 py-8 rounded-xl">
      <h3 className="text-5xl my-10 font-bold text-green-600">
        please register{" "}
      </h3>
      <div className=" px-5 lg:px-80">
        <form onSubmit={handelRegister}>
          <input
            className="px-4 py-2 w-full rounded-lg"
            type="text"
            name="name"
            id=""
            placeholder="enter your name"
            required
          />
          <input
            className="px-4 py-2 w-full rounded-lg my-4"
            type="email"
            name="email"
            id=""
            placeholder="enter your email"
            required
          />
          <br />
         
       
          <div className="relative">
          <input
            className="px-4 py-2 w-full rounded-lg "
            type={ showPassword? "text":"password"}
            name="password"
            id=""
            placeholder="enter your password"
            required
          />
          <span className="absolute top-3 right-3" onClick={()=> setShowPassword(!showPassword)}>
            {showPassword ? <FiEye/> : <FiEyeOff/>}</span>
          </div>

         
          <br />
          <br />
          <input className="mr-3" type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">Accept our <a href="">terms condition</a> </label>
       <br />
       <br />
          <input
            className="btn btn-secondary w-full text-xl"
            type="submit"
            value="submit"
          />
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}

        {success && <p className="text-green-600">{success}</p>}

        <p>Already have an account ? please <Link className="text-green-600 font-bold text-2xl ml-2" to ='/login'>LogIn </Link></p>

        
      </div>
    </div>
  );
};

export default Register;
