import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'

const CreateApi = createApi({
        baseQuery:fetchBaseQuery({
            baseUrl:"https://84a7-2401-4900-1ca3-d799-ddca-8a54-671c-bb7d.ngrok-free.app/api/v1",
            prepareHeaders: (headers) => {
                const user =Cookies.get('AuthLogin');
                if (user) {
                  headers.set("Authorization", `Bearer ${user}`);
                  // headers.set("Content-Type", "application/json");
                } else {
                  console.warn("Token is missing or empty");
                }
                return headers;
              },
        }),
        endpoints:()=>({}),
        tagTypes:["adminPanel"]

});

export default CreateApi;