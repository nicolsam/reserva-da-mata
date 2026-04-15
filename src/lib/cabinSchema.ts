import { z } from 'zod';

export const cabinSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    max_capacity: z.coerce.number().int().positive("Capacity must be greater than 0"),
    regular_price: z.coerce.number().positive("Price must be greater than 0"),
    discount: z.coerce.number().min(0, "Discount cannot be negative").default(0),
});

export type CabinFormData = z.infer<typeof cabinSchema>;