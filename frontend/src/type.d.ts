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