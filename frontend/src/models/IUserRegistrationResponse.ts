export interface IUserRegistrationResponse {
    message: string,
    user: {
        fieldCount: number;
        affectedRows: number;
        insertId: number;
        info: string;
        serverStatus: number;
        warningStatus: number;
        changedRows: number;
    },
    error?: string
}