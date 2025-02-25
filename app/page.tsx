import { Loader } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full fixed inset-0 flex justify-center items-center">
      <Loader className="animate-spin"/>
    </div>
  );
}
