

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

export type MenuItem = {
    name:string,
    price:string
}

export type Restuarant = {
    _id:string,
    user:string,
    restaurantName:string,
    city:string
    country:string
    deliveryPrice:string
    estimateDeliveryTime:string
    cuisines:string[]
    menuItem:MenuItem[]
    imageUrl:string
    lastUpdate:string
}