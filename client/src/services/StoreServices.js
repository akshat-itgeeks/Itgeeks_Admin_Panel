import CreateApi from "./apiService";

const storeService2 = CreateApi.injectEndpoints({

    endpoints:(builder)=>({

        GetStoreList:builder.query({
            providesTags:["store"],
            query:(body)=>({
                
                url:"/store/list",
                method:'POST',
                body
            })
        }),

        GetStoreById:builder.query({
            providesTags:["store"],
            query:({Id})=>({
                
                url:`/store/${Id}`,
                method:'POST',
            })
        }),
      
        AddNewStore:builder.mutation({
            invalidatesTags:["store"],
            query:({data})=>({
                url:`/store`,
                method:"POST",
                body:data
            })
        }),

        UpdateStoreById:builder.mutation({
            invalidatesTags:["store"],
            query:({data,Id})=>({
                url:`/store/${Id}`,
                method:"PUT",
                body:data
            })
        }),
        DeleteStore:builder.mutation({
            invalidatesTags:["store"],
            query:({Id})=>({
                url:`/store/${Id}`,
                method:"DELETE",
            })
        })

    })
})

export const {useGetStoreListQuery,useUpdateStoreByIdMutation,useGetStoreByIdQuery,useDeleteStoreMutation,useAddNewStoreMutation}= storeService2;