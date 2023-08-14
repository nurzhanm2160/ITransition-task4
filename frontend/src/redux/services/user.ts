import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../../models/IUser";
import {IUserRegistrationData} from "../../models/IUserRegistrationData";
import {IUserRegistrationResponse} from "../../models/IUserRegistrationResponse";
import {IUserLoginResponse} from "../../models/IUserLoginResponse";
import {IUserLoginData} from "../../models/IUserLoginData";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')

            if (token) {
                const headersObj = new Headers(headers);
                headersObj.append('Authorization', `${token}`);
                return headersObj;
            }

            return headers;
        }
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<{users: IUser[]}, void>({
            query: () => 'users/',
            providesTags: ['Users']
        }),
        register: builder.mutation<IUserRegistrationResponse, IUserRegistrationData>({
            query: (newUserData) => ({
                url: 'register/',
                method: 'POST',
                body: newUserData,
            }),
        }),
        login: builder.mutation<IUserLoginResponse, IUserLoginData>({
            query: (authData) => ({
                url: 'login/',
                method: 'POST',
                body: authData
            })
        }),
        blockUser: builder.mutation<void, {userId: number, active: number}>({
            query: ({userId, active}) => ({
                url: `/block/${userId}`,
                method: 'PUT',
                body: active
            }),
            invalidatesTags: ['Users']
        }),
        unBlockUser: builder.mutation<void, {userId: number, active: number}>({
            query: ({userId, active}) => ({
                url: `/unblock/${userId}`,
                method: 'PUT',
                body: active
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<void, {userId: number}>({
            query: ({userId}) => ({
                url: `/delete/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUsersQuery,
    useLoginMutation,
    useRegisterMutation,
    useBlockUserMutation,
    useUnBlockUserMutation,
    useDeleteUserMutation
} = userApi