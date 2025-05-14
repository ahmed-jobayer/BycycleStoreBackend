import {  z } from "zod"
import { ShippingStatus } from "./order.constant"

const orderedItemValidationSchema = z.object({
    product: z.string(),
    quantity: z.number(),
    price: z.number()
})


const orderValidationSchema = z.object({
body: z.object({
    products: z.array(orderedItemValidationSchema),
    user: z.string(),
    totalPrice: z.number(),
    shippingStatus:z.enum([...ShippingStatus] as [string, ...string[]]),
    isDeleted: z.boolean()
})
})
const UpdateOrderValidationSchema = z.object({
body: z.object({
    products: z.array(orderedItemValidationSchema).optional(),
    user: z.string().optional(),
    totalPrice: z.number().optional(),
    shippingStatus:z.enum([...ShippingStatus] as [string, ...string[]]),
    isDeleted: z.boolean().optional()
})
})



export const OrderValidation = {orderValidationSchema, UpdateOrderValidationSchema}