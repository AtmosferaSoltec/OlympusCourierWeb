export interface State<T> {
    loading: boolean;
    data?: T;
    error?: string | null;
}

export interface Result {
    isSuccess?: boolean;
    data?: any;
    mensaje?: string;
}