import {users} from '@db/schema';
import { User } from 'next-auth';

declare module "next-auth" {
    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
    type JWT = User;
}