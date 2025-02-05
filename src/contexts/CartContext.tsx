import { createContext, useState } from "react";

interface CartContextData {
    cartItems: cartItemProps[];
    addItemToCart: (itemId: string) => void;
    removeItemFromCart: (itemId: string) => void;
}

type cartItemProps = {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
}

const CartContext = createContext({} as CartContextData);

export default function CartProvider({}: CartContextData) {
    const [cartItems, setCartItems] = useState<cartItemProps[]>();
}