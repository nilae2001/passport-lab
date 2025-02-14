import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { DoneCallback } from 'passport';
import { database, userModel } from '../../models/userModel';

import dotenv from 'dotenv';

dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        callbackURL: process.env.GITHUB_CALLBACK_URL || '',
        passReqToCallback: true,
    },

    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback) => {
        
              if (!profile) {
                  return done(null, false);
              }
        
        const user = userModel.findOrCreate(profile)

        done(null, user);
    },
    
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
