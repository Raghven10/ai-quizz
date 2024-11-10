import NextAuth, {type Session, type User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KeycloakProvider from "next-auth/providers/keycloak";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/index";
 
export const  {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    adapter: DrizzleAdapter(db),
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //     (profile) {
        //         console.log("profile: ", profile);
        //         return ({ 
        //          profile   id: profile.sub,
        //             name: `${profile.given_name} ${profile.family_name}`,
        //             email: profile.email,
        //             image: profile.picture,
        //             role: profile.role ? profile.role : "user"    
        //       })
        //     }
        // })
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID,
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
          })
    ],
    callbacks: {
        async jwt({token, user}){
            console.log(`jwt token`, JSON.stringify(token));
            //token.role = ususerers?.role;
            console.log('user', user);
            return {...token, ...user}
        },
        async session( {session, token}) {
            
           session.user.role = token?.role;
           console.log(`session`, session);
            return session;
        }
    }
});