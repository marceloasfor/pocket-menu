import { AuthOptions } from "next-auth/core/types";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


// export const backendURL = process.env.SERVER_URL;
// TODO: make the .env work
// IMPORTANT: no trailing / at backendURL
export const backendURL = "http://54.146.254.132";
// export const backendURL = process.env.REACT_APP_SERVER_URL;

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/verification'
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                password: {
                    label: "Verification Code",
                    type: "text"
                },
                username: {
                    label: "Username",
                    type: "text",
                },
            },
            async authorize(credentials) {
                const resp = await fetch(backendURL + "/table/member/", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: credentials?.username, verification_code: credentials?.password  }),
                });
                const user = await resp.json();
                const {error} = user;

                if (!error) {
                    return user;
                } else {
                    throw new Error(user.error);
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user_id = user.user_id;
                token.username = user.username;
                token.accessToken = user.token;
                token.restaurant_id = user.restaurant_id;
                token.restaurant_name = user.restaurant_name;
                token.table_number = user.table_number;
            }

            return token;
        },
        session: ({ session, token, user }) => {
            if (token) {
                session.user.id = token.user_id;
                session.user.name = token.username;
                session.user.accessToken = token.accessToken;
                session.restaurant_id = token.restaurant_id;
                session.restaurant_name = token.restaurant_name;
                session.table_number = token.table_number;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };