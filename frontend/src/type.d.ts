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

interface AdminProductState {
     loading: boolean;
     message: string;
     productList: ProductType[];
     product: ProductType | null;
}