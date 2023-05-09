import NextAuth from "next-auth";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      async authorize(credentials, req){
        const {email, password} = credentials;
        const user = await User.findOne({email}).exec();
        const existingUser = user._doc
        const verifyLogin = await bcrypt.compare(password, user.password);
        if(user && verifyLogin) {
            console.log(verifyLogin)
            return user;
        } else {
            return null;
        }
      }
    }),
  
  ],
}
export default NextAuth(authOptions)