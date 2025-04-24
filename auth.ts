import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Type guard to ensure profile is from GitHub
      if (account?.provider === "github" && profile) {
        const { name, email, image } = user;
        
        const { login, id, bio, phone_number, gender} = profile as {
          login: string;
          id: string;
          bio?: string;
          phone_number?: string,
          gender?: string,
        };

        try {
          const existingUser = await client.withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

          if (!existingUser) {
            await writeClient.create({
              _type: "user",
              id,
              username: login,
              name,
              email,
              phone: phone_number,
              gender,
              imageUrl: image,
              bio: bio || "",
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          // return false;
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(
          AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });

        token.id = user?._id
      }
      
      // do some stuff
      return token;
    },

    async session({ token, session}) {
      
      // asign sanity user _id to session id
      Object.assign(session, {id: token.id});
      return session;
    },
  }
})
