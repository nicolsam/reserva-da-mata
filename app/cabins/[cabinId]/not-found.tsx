import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
      <h2 className="text-3xl font-bold mb-4">Cabin Not Found</h2>
      <p className="text-muted-foreground mb-8">
        We could not find the cabin you are looking for. Please check the URL or return to the cabins list.
      </p>
      <Button asChild>
        <Link href="/cabins">Back to Cabins</Link>
      </Button>
    </div>
  );
}
