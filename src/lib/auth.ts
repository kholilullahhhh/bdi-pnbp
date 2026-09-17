import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Mock users - akan diganti dengan database setelah Neon terkoneksi
const mockUsers = [
  {
    id: "1",
    email: "admin@bdi-makassar.go.id",
    password: "admin123",
    name: "Administrator BDI",
    role: "ADMIN",
  },
  {
    id: "2",
    email: "operator@bdi-makassar.go.id",
    password: "operator123",
    name: "Operator BDI",
    role: "OPERATOR",
  },
  {
    id: "3",
    email: "user@contoh.com",
    password: "user123",
    name: "User Contoh",
    role: "USER",
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Coba cari di mock users dulu
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // Jika tidak ditemukan di mock, return null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role: string }).role = token.role as string;
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
});
