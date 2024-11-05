import React from 'react';

import './Login.css';
import logo from '../../logo-tag.svg';

function Login() {
  return (
    <>
      <div className='Login'>
        <div className='LogoContainer'>
          <img className='Logo' src={logo}></img>
        </div>
        <div className='LoginFormContainer'>
          <h1 className='FormTitle'>GL Resource Manager</h1>
          <form className='Form'>
            <div>
              <label className='FormLabel'>Email</label>
              <input type='email' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Password</label>
              <input type='password' className='FormInput' />
            </div>
            <input type='submit' value='Login' className='FormSubmit' />
          </form>
          <a href='/register' className='Link'>Create Account</a>
        </div>
      </div>
    </>
  );
}

export default Login;