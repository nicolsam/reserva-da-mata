import Prisma from "@/src/lib/prisma";
import { Cabin } from "@prisma/client";
import { cache } from 'react';
import { z } from 'zod';

export const cabinSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    max_capacity: z.coerce.number().int().positive("Capacity must be greater than 0"),
    regular_price: z.coerce.number().positive("Price must be greater than 0"),
    discount: z.coerce.number().min(0, "Discount cannot be negative").default(0),
});

export async function getAllCabins(): Promise<Cabin[]> {
    try {
        const cabins = await Prisma.cabin.findMany();
        return cabins;
    } catch (error) {
        console.error("Error fetching cabins:", error);
        throw new Error("Failed to fetch cabins");
    }
}

export const getCabinById = cache(async (id: string): Promise<Cabin | null> => {
    try {
        const cabin = await Prisma.cabin.findUnique({
            where: { id },
        });
        return cabin;
    } catch (error) {
        console.error(`Error fetching cabin with id ${id}:`, error);
        return null; // Return null to trigger the not-found page
    }
});
