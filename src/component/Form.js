import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const schema = yup.object({
  username: yup.string().required("Username is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Phone number is not valid"
    ),
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password')], "Password does not match"),
});

function Form() {

    const [passShown,setpassShown]=useState(false);
    const [conpassShown,setconpassShown]=useState(false);

    const togglePasswordVisiblity=()=>{

        setpassShown(passShown ? false:true);

    }
    const toggleConfirmPasswordVisiblity =()=>{
        setconpassShown(conpassShown ? false:true);
    }

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm({
    resolver: yupResolver(schema),
  });
  //console.log(errors);

  const formSubmit = (data) => {
    console.log(data);
    Swal.fire( 'Good job!','Form Submitted','success');
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <h1>Sign Up</h1>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter the Username"
            {...register("username")}
          />
          <span className="error-message">{errors.username?.message}</span>
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            {...register("phone")}
          />
          <span className="error-message">{errors.phone?.message}</span>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            {...register("email")}
          />
          <span className="error-message">{errors.email?.message}</span>
        </div>
        <div className="input-group pass-wrapper">
          <label>Password</label>
          <input
            type={passShown ? "text":"password"}
            id="password"
            placeholder="Enter Password"
            {...register("password")}
          />
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          <span className="error-message">{errors.password?.message}</span>
        </div>
        <div className="input-group pass-wrapper" >
          <label>Confirm Password</label>
          <input
            type={conpassShown ? "text":"password"}
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            {...register("confirmPassword")}
          />
          <i onClick={toggleConfirmPasswordVisiblity}>{eye}</i>

          <span className="error-message">
            {errors.confirmPassword?.message}
          </span>
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default Form;
