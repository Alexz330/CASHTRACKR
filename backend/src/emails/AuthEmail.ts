type EmailType = {
 name: string;
 email: string;
 token: string; 
}



export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        console.log(user)
    }       
}
