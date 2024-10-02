interface ISignin {
     email: string;
     password: string;
}

interface ISignup {
     name: string;
     email: string;
     password: string;
}

interface IProfile {
     _id: string;
     name: string;
     email: string;
     role: string;
}

interface UserState {
     user: IProfile | null;
     isAuthenticated: boolean;
     loading?: boolean;
     message?: string;
}

interface ProductType {
     _id: string;
     user: string;
     title: string;
     brand: string;
     image: string | null;
     category: string;
     description: string;
     price: number;
     salePrice: number;
     totalStock: number;
}
interface AddProductForm {
     title: string;
     brand: string;
     image: string | null;
     category: string;
     description: string;
     price: number;
     salePrice: number;
     totalStock: number;
}
interface UpdateProductForm {
     title?: string;
     brand?: string;
     image?: string | null;
     category?: string;
     description?: string;
     price?: number;
     salePrice?: number;
     totalStock?: number;
}

interface ProductState {
     loading: boolean;
     message: string;
     productList: ProductType[];
     product: ProductType | null;
}

interface ProductId {
     _id: string;
     image: string;
     title: string;
     price: number;
     salePrice: number;
     quantity: number;
     totalStock: number;
}
interface CartItems {
     productId: ProductId;
}

interface CartState {
     loading: boolean;
     message: string;
     productList: CartProduct[];
}

interface Product {
     productId: {image: string, _id: string};
     image: string;
     name: string;
     price: number;
     quantity: number;
}
interface Address {
     street: string;
     city: string;
     state: string;
     pin: number;
}

interface Order {
     products: Product[];
     addressInfo: Address;
     status: string;
     createdAt: Date;
     updatedAt: Date;
}
interface OrderState {
     loading: boolean;
     message: string;
     orderList: Order[];
}