import React from 'react';
import { MdEmail } from 'react-icons/md';
import PasswordInput from '../Components/PasswordInput';
import { useLoginForm } from '../hooks/useLoginForm';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        onSubmit,
        isPending,
    } = useLoginForm();

    return (
        <main className='bg-login-bg bg-center bg-cover h-screen flex items-center justify-center'>
            <div className='custom-container w-full'>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='m-auto shadow-lg bg-gradient-to-br from-gray-800 to-gray-700 text-white  rounded-2xl w-[28%] min-h-96 flex flex-col justify-evenly items-center p-4 px-8 ring-1 ring-blue-500/50'>
                        <h1 className='text-center text-2xl my-2 font-semibold'>
                            Sign in with Email
                        </h1>

                        <div className='input input-bordered flex items-center w-full gap-2 mt-4'>
                            <label htmlFor='email'>
                                <MdEmail className='text-gray-400 w-5 h-5' />
                            </label>
                            <input
                                id='email'
                                className='w-full placeholder:text-gray-400 text-base text-gray-800'
                                placeholder='Email'
                                type='email'
                                {...register('email')}
                            />
                        </div>

                        <PasswordInput name='password' placeholder='Password' register={register} passwordError={errors.password} />

                        <button
                            disabled={isPending}
                            className={`btn-primary w-3/4 px-6 py-2 ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    {errors.root && (
                        <pre className="text-[red] text-sm mt-3 w-fit mx-auto">
                            {errors.root.message}
                        </pre>
                    )}
                </form>

            </div>
        </main>
    );
}
