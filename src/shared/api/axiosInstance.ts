
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getCookie, setCookie } from 'cookies-next'
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL
})

// $api.interceptors.request.use(async (config) => {
//     const session = await getServerSession(authOptions)
//     config.headers.Authorization = `Bearer ${session?.user?.accessToken}`
//     return config;
// })

// $api.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<{accessToken: string, refreshToken: string}>(`${process.env.API_URL}/refresh`, {withCredentials: true})
//             setCookie('accessToken', response.data.accessToken);
//             return $api.request(originalRequest);
//         } catch (e) {
//             await signOut()
//             redirect('sign-in?session_over=true')
            
//         }
//     }
//     throw error;
// })

export default $api;