export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  // EmptyObject = 'EmptyObject',
  InvalidMongoId = 'InvalidMongoId',
  // InvalidSeatsQty = 'InvalidSeatsQty',
  // InvalidDoorsQty = 'InvalidDoorsQty',
  // EmptyAttibutesVehicle = 'EmptyAttibutesVehicle',
  // EmptyAttibutesCar = 'EmptyAttibutesCar,',
}

type ErrorResponseObject = {
  status: number,
  message: string,
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    status: 400,
    message: 'Entity not found',
  },
  InvalidMongoId: {
    status: 400,
    message: 'Invalid id or not found',
  },
};