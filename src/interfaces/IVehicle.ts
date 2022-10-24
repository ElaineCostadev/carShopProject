import { z } from 'zod';

const CURRENTYEAR = 2022;

export const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  })
    .min(3, { message: 'Must be 3 or more characters long' }),

  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  })
    .positive()
    .gt(1900, { message: 'Must be 1900 or more' })
    .lte(CURRENTYEAR, { message: `Must be ${CURRENTYEAR} or less` }),

  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  })
    .min(3, { message: 'Must be 3 or more characters long' }),

  status: z.optional(z.boolean()),

  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number integer',
  })
    .int(),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;
