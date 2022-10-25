import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

// enum categoryMotocycle {
//   Street = 'Street', 
//   Custom = 'Custom',
//   Trail = 'Trail',
// } 

// {
//   required_error: 'category is required',
//   invalid_type_error: 'category must be Street or Custom or Trail',
//   }
export const motorcycleZodShema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number integer positive',
  })
    .positive()
    .int()
    .lte(2500, { message: 'Must be 2500 or less' }),
});

export type IMotorcycle = z.infer<typeof motorcycleZodShema>;
