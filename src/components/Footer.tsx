import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 bg-[var(--color-brand-dark)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <Image src="/logo.jpg" alt="Luzny Content" width={40} height={40} className="rounded-xl opacity-50" />
        <p className="text-white/25 text-sm font-light uppercase tracking-[0.3em] text-center">
          &copy; {new Date().getFullYear()} Luzny Content &mdash; Julia Jabłońska
        </p>
      </div>
    </footer>
  );
}
