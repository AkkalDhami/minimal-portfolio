import { useSound } from "@/hooks/use-sound";
import { click003Sound } from "@/sounds/click-003";
import Image from "next/image";
import Link from "next/link";

export function Profile() {
  const [play] = useSound(click003Sound);
  return (
    <Link
      href="/"
      onClick={() => play()}
      className="group relative flex items-center justify-center">
      <Image
        src="/images/profile.jpg"
        alt="Profile"
        width={50}
        height={50}
        className="primary-ring size-10 rounded-full object-cover object-left p-0.5"
      />
    </Link>
  );
}
