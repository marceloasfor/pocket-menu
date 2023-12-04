import NextAuth from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        restaurant_id: string | null,
        restaurant_name: string | null,
        table_number: string | null,
    }
}