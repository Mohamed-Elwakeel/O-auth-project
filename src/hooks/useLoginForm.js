import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const mockLoginAPI = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === 'admin@admin.com' && data.password === '12345678') {
                resolve({
                    data: {
                        access: 'mockAccessToken',
                        role: 'admin',
                    },
                });
            } else {
                reject({
                    response: {
                        data: { message: 'Invalid email or password' },
                    },
                });
            }
        }, 1000);
    });
};

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['access-token', 'role']);

    const mutation = useMutation({
        mutationFn: mockLoginAPI
    });

    const { isPending } = mutation;

    const form = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            emailL: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        mutation.mutate(data, {
            onSuccess: (response) => {
                setCookie('access-token', response.data.access);
                setCookie('role', response.data.role);
                toast.success('Login Successful');
                navigate('/');
            },
            onError: (err) => {
                console.error(err);
                toast.error(
                    err.response?.data?.message || 'Something went wrong, try again!'
                );
                form.setError('root', {
                    message: err.response?.data?.message || 'Invalid credentials',
                });
            },
        });
    };
    return { ...form, onSubmit, isPending };
};
