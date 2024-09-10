import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["posts"],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: ["posts"],
    }),
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "posts",
          method: "POST",
          body: JSON.stringify(data),
        };
      },
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `posts/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} = apiSlice;
