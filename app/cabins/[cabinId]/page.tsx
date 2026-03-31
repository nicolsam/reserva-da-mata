import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCabinById } from "@/src/services/components/CabinService";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface IProps {
    cabinId: string;
}

export async function generateMetadata({ params }: {
    params: Promise<IProps>
}): Promise<Metadata> {
    const { cabinId } = await params;
    const cabin = await getCabinById(cabinId);

    return {
        title: cabin ? `${cabin.name}` : "Reserva da Mata",
    };
}

export default async function Page({ params }: { 
    params: Promise<IProps>
}) {

    const { cabinId } = await params;

    const cabin = await getCabinById(cabinId);

    if (!cabin) {
        notFound();
    }

    const hasDiscount = Number(cabin.discount) > 0;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Card className="overflow-hidden">
                {cabin.imageUrl && (
                    <div className="relative h-64 w-full">
                        <Image
                            src={cabin.imageUrl}
                            alt={cabin.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-3xl font-bold">{cabin.name}</CardTitle>
                        {hasDiscount && (
                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                {cabin.discount.toString()}% OFF
                            </span>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{cabin.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <span className="block font-semibold">Max Capacity</span>
                            <span>{cabin.max_capacity} guests</span>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <span className="block font-semibold">Price</span>
                            <span>${cabin.regular_price.toString()} / night</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
