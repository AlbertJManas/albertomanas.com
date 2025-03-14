import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Alberto Mañas</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Full Stack Developer | Java & Next.js</p>
      </header>

      <main className="flex flex-col items-center gap-8">
        <Image
          className="rounded-full border-4 border-primary/50"
          src="/profile-photo.jpg"
          alt="Alberto Mañas"
          width={160}
          height={160}
          priority
        />
        <p className="max-w-lg text-center text-gray-700 dark:text-gray-300">
          Passionate about building scalable and maintainable software solutions. Specializing in microservices, cloud architectures, and modern frontend technologies.
        </p>
        <Link
          className="px-6 py-3 rounded-lg bg-primary text-white text-lg font-semibold hover:bg-primary/80 transition"
          href="/contact"
        >
          Contact Me
        </Link>
      </main>
    </div>
  );
}
