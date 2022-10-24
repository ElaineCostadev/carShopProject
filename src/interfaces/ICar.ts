import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).int()
    .gte(2, { message: 'Must be 2 or more' })
    .lte(4, { message: 'Must be 4 or less' }),

  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).int()
    .gte(2, { message: 'Must be 2 or more' })
    .lte(7, { message: 'Must be 7 or less' }),
});

export type ICar = z.infer<typeof carZodSchema>;

// export const carZodSchema = z.object({
//   doorsQty: z.number().int().gte(2).lte(4),
//   seatsQty: z.number().int().gte(2).lte(7),
// });

// export interface ICar extends IVehicle {
//   doorsQty:
//   seatsQty:
// };