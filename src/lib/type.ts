

export type CreateUserType = {
email:string,
email_verified:boolean,
family_name:string,
given_name:string,
name:string,
nickname:string,
picture:string,
sub:string
updated_at:string
}

export type User = {
    _id:string
    email:string,
    name:string,
    addressLine1:string,
    city:string,
    country:string
}