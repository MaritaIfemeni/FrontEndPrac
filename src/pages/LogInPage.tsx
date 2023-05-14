import React from "react";

const LogInPage = () => {
  return (
    <div>
      LogIn registration form
      <form>
        <div>
          <label htmlFor="username">Userame</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="phone" name="phone" id="phone" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirm">Password Again</label>
          <input type="password" name="confirm" id="confirm" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogInPage;
