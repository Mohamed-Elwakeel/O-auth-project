import React, { useState } from 'react';
import { MdLock } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({
    name,
    placeholder,
    register,
    passwordError,
    className,
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);

    return (
        <div
            className={twMerge(
                `input input-bordered flex items-center w-full gap-2 mt-4`,
                className
            )}
        >
            <label htmlFor={name}>
                <MdLock className='text-gray-400 w-5 h-5' />
            </label>
            <input
                id={name}
                autoComplete='off'
                className='w-full placeholder:text-gray-400 text-base text-gray-800'
                placeholder={placeholder}
                type={isPasswordVisible ? 'text' : 'password'}
                {...register(name)}
            />

            <button
                type='button'
                className='ms-auto'
                onClick={togglePasswordVisibility}
            >
                {!isPasswordVisible && <FaEye className='text-gray-400 w-5 h-5' />}
                {isPasswordVisible && <FaEyeSlash className='text-gray-400 w-5 h-5' />}
            </button>

            {passwordError && (
                <pre className='text-[red] ms-2 text-sm mt-3 w-full'>
                    {passwordError.message}
                </pre>
            )}
        </div>
    );
}
