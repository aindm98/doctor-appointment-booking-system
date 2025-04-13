'use client';
import AuthForm from "./components/forms/auth-form";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './services/providers/auth-provider';
const SignIn = () =>{

  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.replace('/dashboard'); 
    }
  }, [isAuth, router]);

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
            <div id="login-form">
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
                Log In
              </h2>           
              <AuthForm />
            </div>       
          </div>
        </div>
  );
}

export default SignIn;
