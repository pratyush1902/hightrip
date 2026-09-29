import { ExperiencesTheme } from './ExperiencesTheme';

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="experiences-root"
      style={{ backgroundColor: '#0b0a08', color: '#f5efe6' }}
      className="bg-[#0b0a08] min-h-screen text-[#f5efe6] selection:bg-[#c48c58]/30 selection:text-[#c48c58] w-full"
    >
      <ExperiencesTheme />
      {children}
    </div>
  );
}
