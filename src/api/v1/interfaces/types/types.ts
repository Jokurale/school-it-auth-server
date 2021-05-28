type Code = number;
type Message = string;
type Login = string;
type Password = string;
type PasswordHash = string;
type Token = string;

// Generic
type StatusError = {
  status?: number;
  message?: string;
} & SyntaxError;

// Custom
type ErrorMessage = {
  code: Code;
  message: Message;
};

type JWTVerificationResult = {
  payload: {
    login: string;
    id: string;
  };
};

// Attachment purposes
declare namespace Express {
  export interface Request {
    token?: string;
  }
}
