import * as joi from 'joi';
import { CreateVisitorDto } from '../../application/dto/CreateVisitor.dto';
type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: CreateVisitorDto;
};
export declare function validateCreateVisitor(data: any): ValidationResult;
/** Un id que no sea UUID nunca existe; sin esto, Postgres lo rechaza con un error y saldría un 500. */
export declare function validateVisitorId(id: string): joi.ValidationResult<string>;
export {};
//# sourceMappingURL=Visitor.validation.d.ts.map