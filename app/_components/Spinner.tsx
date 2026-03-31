import { Loader2 } from 'lucide-react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
