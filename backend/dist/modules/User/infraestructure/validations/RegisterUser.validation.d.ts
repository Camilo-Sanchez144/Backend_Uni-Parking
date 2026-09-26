import * as joi from 'joi';
export type RegisterUserData = {
    name: string;
};
type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: RegisterUserData;
};
export declare function validateRegisterUser(data: any): ValidationResult;
export {};
//# sourceMappingURL=RegisterUser.validation.d.ts.map