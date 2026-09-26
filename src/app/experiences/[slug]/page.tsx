import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  availableExperiences, 
  ethicalCode 
} from '@/data/experiences';
import { ArrowLeft, Phone, MapPin, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { ExperienceDetailClient } from './ExperienceDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return availableExperiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = availableExperiences.find((e) => e.slug === slug);
  if (!exp) return {};

  return {
    title: `${exp.name}: a dark-tourism Experience | High Trip Holidays`,
    description: `${exp.oneLine} Curated with dignity, scholarship, and quiet contemplation by High Trip Holidays.`,
    openGraph: {
      title: `${exp.name} | High Trip Holidays`,
      description: exp.oneLine,
      images: [{ url: exp.heroImage }],
    },
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const exp = availableExperiences.find((e) => e.slug === slug);

  if (!exp) {
    notFound();
  }

  return (
    <div className="bg-obsidian min-h-screen text-parchment selection:bg-bronze/30 selection:text-bronze-light">
      {/* Client Component with interactive inquiry, gallery, and dossier details */}
      <ExperienceDetailClient exp={exp} />
    </div>
  );
}
