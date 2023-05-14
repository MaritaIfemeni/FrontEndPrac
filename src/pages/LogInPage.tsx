import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema, { RegistrationFormData} from "../validation/registrationSchema";



// export interface RegisterFormData{
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirm: string;
// }

const LogInPage = () => {
  const { handleSubmit, register, control, formState: {errors} } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });
  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
  };


  // Inputs are uncontrolled here, but you can use the "control" prop to register them into react-hook-form
  //if you want to use MUI you hava to do this.

  //validation like compairing the password and confirm password, 
  //u can use library resolvers you
  return (
    <div>
      LogIn registration form
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Userame</label>
          <input type="text" id="username" {...register("username")} />
          <div>{errors.username && (<p>errors.username.message</p>)}</div> 
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")}/>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="phone" id="phone" {...register("phone")}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")}/>
        </div>
        <div>
          <label htmlFor="confirm">Password Again</label>
          <input type="password" id="confirm" {...register("confirm")}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogInPage;
