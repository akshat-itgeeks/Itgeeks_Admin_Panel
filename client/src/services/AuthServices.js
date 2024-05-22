import CreateApi from "./apiService";

const AuthServices = CreateApi.injectEndpoints(
    {
        endpoints:(builder)=>(
            {

                Login:builder.mutation(
                    {
                        query:({data})=>(
                            {
                                url:'/auth/login',
                                method:"POST",
                                body:data
                            }
                        )
                    }),
                ResetPassword:builder.mutation(
                    {
                        query:({data})=>(
                            {
                                url:'/auth/reset-password',
                                method:"POST",
                                body:data
                            }
                        )
                    })

            }
        )
    }
)

export const {useLoginMutation,useResetPasswordMutation}= AuthServices;