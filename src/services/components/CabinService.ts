import { Cabin } from "@/app/generated/prisma/client";

import Prisma from "@/src/lib/prisma";

export async function getAllCabins(): Promise<Cabin[]> {
    try {
        const cabins = await Prisma.cabin.findMany();
        return cabins;
    } catch (error) {
        console.error("Error fetching cabins:", error);
        throw new Error("Failed to fetch cabins");
    }
}