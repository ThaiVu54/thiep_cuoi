import { SectionPage } from "@/components/SectionPage";

type PageProps = { searchParams: { g?: string } };

export default function Page({ searchParams }: PageProps) {
  return <SectionPage id="program" guestSlug={searchParams.g} />;
}
