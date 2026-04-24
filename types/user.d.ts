export interface UserData {
    username: string;
    name: string;
    phone_number: string;
    email: string;
    access_token: string;
}

export interface AuthContextType {
    userData: UserData | null;
    login: (userData: UserData, userType: string) => void;
    logout: () => void;
}