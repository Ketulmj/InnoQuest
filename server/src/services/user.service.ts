import type { User } from '../models/user.js';

export async function fetchUserFromDb(email: string): Promise<User> {
    // fetch user from database

    // simulation of database access
    return new Promise(( resolve, reject ) => {
        if (email === "abc@gmail.com") {
            const user = { 
                id: "1", 
                email: "abc@gmail.com", 
                password: '$2b$10$aqSgr0Dmi8gn71rDyE16xO/miwxnLzQaW1mZhLdKJSiEFdftNdmN.', 
                name: "john",
                avatar: "base64_string_of_image" 
            };
            setTimeout(() => resolve(user), 500);
        } else {
            return reject({error: "error while fetching data"});
        }
    });
}

export async function createUserIntoDb(user : any) {
    // insert user into database

    // const newUser = {
    //     user.email,
    //     password,
    //     name,
    //     avatar
    // }

    // simulation of database access
    setTimeout(() => {

    }, 500);
}