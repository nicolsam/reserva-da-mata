import { getAllCabins } from "@/src/services/components/CabinService";

import Image from "next/image";

import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';

export default async function Cabins() {
    const cabins = await getAllCabins();

    return (
        <div>
            <h1>Cabins list</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cabins.map(cabin => (
                    <Card key="cabin.id">
                        <div>
                            <Image 
                                src={cabin.imageUrl} 
                                alt={cabin.name} 
                                width={400} 
                                height={200} 
                                className="rounded-t-lg" 
                                />
                        </div>
                        <CardHeader>{cabin.name}</CardHeader>
                        <CardContent>{cabin.description}</CardContent>
                    </Card>
                ))}
            
            </div>
        </div>
    )
}
