import React from "react";
import { useForm } from "react-hook-form";

const LogInPage = () => {
  const { handleSubmit, register } =useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      LogIn registration form
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Userame</label>
          <input type="text" id="username" {...register("username")} />
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
