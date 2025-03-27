export interface ProductItem {
    id: string
    name: string
    description: string
    price: string
    banner: string
    category_id: string
    createdAt: Date 
}

export type CartItem = ProductItem & {
    amount: number
}