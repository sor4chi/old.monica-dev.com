import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error(
    'Please define the GITHUB_ID and GITHUB_SECRET environment variables inside .env.local',
  );
}

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
