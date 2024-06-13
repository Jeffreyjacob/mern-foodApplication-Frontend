

export type CreateUserType = {
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    name: string,
    nickname: string,
    picture: string,
    sub: string
    updated_at: string
}

export type User = {
    _id: string
    email: string,
    name: string,
    addressLine1: string,
    city: string,
    country: string
}

export type MenuItem = {
    _id:string
    name: string,
    price: string
}

export type Restuarant = {
    _id: string,
    user: string,
    restaurantName: string,
    city: string
    country: string
    deliveryPrice: string
    estimateDeliveryTime: string
    cuisines: string[]
    menuItem: MenuItem[]
    imageUrl: string
    lastUpdate: string
}

export type RestuarantSearchResponse = {
    data: Restuarant[];
    pagination: {
        total: number,
        page: number,
        pages: number
    }
}

export type CheckOutSessionRequest = {
    cartItems:{
        menuItemId:string;
        name:string;
        quantity:string;
    }[];
    deliveryDetails:{
        email:string;
        name:string;
        addressLine1:string;
        city:string
    },
    restaurantId:string
}

export type OrderStatus = "placed" | "paid" |"inProgress" | "outForDelivery" | "delivered"

export type Order = {
    _id:string;
    restaurant:Restuarant;
    user:User,
    cartItems:{
        menuItemId:string;
        name:string;
        quantity:string;
    }[],
    deliveryDetails:{
        name:string;
        addressLine1:string;
        city:string;
        email:string;
    };
    totalAmount:number;
    status:OrderStatus;
    createdAt:string;
    restaurantId:string

}