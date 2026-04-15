import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="flex gap-4 p-4 bg-white text-blue-800">
            <Link href="/cabins" className="hover:underline">
                View Cabins
            </Link>
            <Link href="/cabins/create" className="hover:underline">
                Create a Cabin
            </Link>
        </nav>
    );
}