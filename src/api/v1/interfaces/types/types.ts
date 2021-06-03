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

type NewAccessToken = {
  accessToken: string;
};

type NewTokenSet = {
  accessToken: string;
  refreshToken: string;
};

type UserCredentialsInfo = {
  id: string;
  credential: {
    id: string;
    login: string;
    password: string;
    role: string;
    userId: string;
  };
  student?: {
    id: string;
    userId: string;
  };
};
// Attachment purposes
declare namespace Express {
  export interface Request {
    token?: string;
  }
}
