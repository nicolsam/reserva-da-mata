import { Cabin } from "@/app/generated/prisma/client";
import Prisma from "@/src/lib/prisma";
import { cache } from 'react';

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
