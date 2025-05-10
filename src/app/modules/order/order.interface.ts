import { Types } from "mongoose"


export type TShippingStatus = 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'CANCELED'
export type TPaymentStatus = 'UNPAID' | 'PAID' 

export type TOrderedItem = {
    product: Types.ObjectId,
    quantity: number, 
    price: number
}
 
export type TOrder = {
    products: TOrderedItem[],
    user: Types.ObjectId,
    totalPrice: number,
    isDeleted?: boolean,
    shippinhStatus?: TShippingStatus,
    transactionId?: string,
    paymentStatus?: TPaymentStatus
}