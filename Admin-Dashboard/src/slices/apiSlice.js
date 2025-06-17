import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// const baseQuery = fetchBaseQuery({ baseUrl: " https://gatewayregistry.onrender.com", credentials: 'include' })
const baseQuery = fetchBaseQuery({ baseUrl: " https://grs-gbeb.onrender.com", credentials: 'include' })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Admin'],
    endpoints: (bulider) => ({}),
})
