import db from '../db/index.js'
import { eq } from 'drizzle-orm';
import userSchema from '../db/schema/user.js';

export async function fetchUserFromDb(email: string): Promise<any> {
    try {
        // fetch user from database
        const user = await db.select().from(userSchema).where(eq(userSchema.email, email));
        // console.log(user)

        if(user.length === 0) 
            return null;
        return user[0];

    } catch (e) {
        console.log("Error fetching user : ", e)
        throw new Error();
    }
}

export async function createUserIntoDb(user: any): Promise<any> {
    try {
    // insert user into database
    const newUser = await db.insert(userSchema).values({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        avatar: user.avatar
    })
    return newUser;

    } catch (e) {
        console.log("Error fetching user : ", e)
        throw new Error();
    }
}