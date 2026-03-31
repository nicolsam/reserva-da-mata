import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center">
      <Spinner />
    </div>
  );
}
