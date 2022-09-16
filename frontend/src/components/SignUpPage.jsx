import React from 'react'
import imageAvatarSg from '../assets/avatar_signup.jpg';
import SignUpForm from './SignUpForm';

export default function SignUpPage (){
    return (
        <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
            <div className="card-body row p-5">
<div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    <img src={imageAvatarSg} />
    </div>
    <SignUpForm />
    </div>
    {/* //footer  */}
   
            </div>
            </div>
            </div>
            </div>


        )
}