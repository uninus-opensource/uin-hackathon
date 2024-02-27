import type { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CreadentialProvider from 'next-auth/providers/credentials';
import { PostLogin } from './web-auth.api';
import { TMetaErrorResponse, VSLogin } from '@psu/entities';
import { AxiosError } from 'axios';

export const authOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: { strategy: 'jwt' },
  providers: [
    GithubProvider({
      id: 'github',
      name: 'github',
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      id: 'google',
      name: 'google',
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CreadentialProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error('Email dan Password wajib diisi');
          }

          const validatedFields = VSLogin.safeParse(credentials);

          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await PostLogin({ email, password });
            return user;
          }

          return null;
        } catch (err) {
          const error = err as TMetaErrorResponse;

          if (error?.response?.status === 422) {
            throw new Error(error?.response?.data?.errors?.[0]?.message[0]);
          }

          throw new Error(
            typeof error?.response?.data === 'string'
              ? error?.response?.data
              : error?.response?.data?.message
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, profile, account }) {
      if (account?.provider === 'google' && profile) {
        token.fullname = profile?.name as string;
        token.image = profile?.picture;
        token.email = profile?.email;
        token.role = {
          id: '1',
          name: 'Google User',
          permissions: [],
        };
      }

      if (account?.provider === 'github' && profile) {
        token.fullname = profile?.name as string;
        token.image = profile?.picture;
        token.email = profile?.email;
        token.role = {
          id: '1',
          name: 'Github User',
          permissions: [],
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        email: token.email as string,
      };
      return session;
    },
  },
} as AuthOptions;
