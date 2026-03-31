import { getAllCabins } from "@/src/services/components/CabinService";
import Link from "next/link";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';

export default async function Cabins() {
    const cabins = await getAllCabins();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cabins.map(cabin => (
                    <Card key={cabin.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
                        <div>
                            <Image 
                                src={cabin.imageUrl || "https://placehold.co/400x192"} 
                                alt={cabin.name} 
                                width={400} 
                                height={192} 
                                className="rounded-t-lg object-cover w-full h-48" 
                                />
                        </div>
                        <CardHeader className="pb-2">
                            <h2 className="text-xl font-bold text-gray-900">{cabin.name}</h2>
                        </CardHeader>
                        <CardContent className="text-gray-600 flex-grow">
                            <p className="text-sm">{cabin.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/cabins/${cabin.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            
            </div>
        </div>
    )
}
