import React from 'react';

import './Register.css';
import logo from '../../logo-tag.svg';

function Register() {
  return (
    <>
      <div className='Register'>
        <div className='LogoContainer'>
          <img className='Logo' src={logo}></img>
        </div>
        <div className='RegisterFormContainer'>
          <h1 className='FormTitle'>GL Resource Manager</h1>
          <form className='Form'>
            <div>
              <label className='FormLabel'>Name</label>
              <input type='text' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Last Name</label>
              <input type='text' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Email</label>
              <input type='email' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Password</label>
              <input type='password' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Confirm Password</label>
              <input type='password' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Phone</label>
              <input type='text' className='FormInput' />
            </div>
            <div>
              <label className='FormLabel'>Company</label>
              <input type='text' className='FormInput' />
            </div>
            <input type='submit' value='Create Account' className='FormSubmit' />
          </form>
          <a href='/login' className='Link'>Already have an account?</a>
        </div>
      </div>
    </>
  );
}

export default Register;