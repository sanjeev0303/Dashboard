import {z} from "zod"


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
    password: z.string().min(4,{
        message: "Password must be at least 4 characters."
    }),
    name: z.string().min(2, {
        message: "Enter you name please!"
    })
})
