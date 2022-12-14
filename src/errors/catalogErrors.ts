export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  status: number,
  message: string,
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    status: 404,
    message: 'Object not found',
  },
  InvalidMongoId: {
    status: 400,
    message: 'Id must have 24 hexadecimal characters',
  },
};