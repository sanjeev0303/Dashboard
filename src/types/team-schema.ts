import {z}  from "zod"


export const TeamSchema = z.object({
email: z.string().nullable(),
name: z.string().nullable().optional(),
isAdmin: z.boolean().optional(),
isApproved: z.boolean().optional(),
image: z.string().nullable().optional(),
location: z.string().nullable().optional(),
})


export type Team = z.infer<typeof TeamSchema>
