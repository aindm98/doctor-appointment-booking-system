'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import { Toaster } from "sonner";
import { useAuth } from './../../services/providers/auth-provider';
import { FieldValues, useForm } from 'react-hook-form';

const AuthForm = () => {

    const { login } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
          username: '',
          password: '',
        },
      });

      const onSubmit =  (data: FieldValues) => {
       console.log('data', data);
       
       
        try {
            const result =  login(data.username, data.password);
            console.log('result', result);
            if (result.success) {
              router.push('/dashboard');
            } 
          } catch (err) {
            console.error('Login error:', err);
            
          }
        
      };
      
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="username"
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
       {errors.username && (
    <p className="text-red-500 text-sm mt-1">{errors.username.message as string}</p>
  )}
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
  )}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200"
        >
          Log In
        </button>
        <p className="text-center text-gray-600 mt-6">
          <a
            href="#"
            
            className="text-purple-500 hover:underline"
            // onclick="toggleForm('forgot-password-form')"
          >
            Forgot Password?
          </a>
        </p>
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-purple-500 hover:underline"
            // onclick="toggleForm('signup-form')"
          >
            Sign Up
          </a>
        </p>
      </form>
    )
};
export default AuthForm;