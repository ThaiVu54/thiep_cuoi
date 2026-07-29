import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export function LoveStory() {
  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Chuyện chúng mình</h2>
      <div className="mt-4 space-y-4">
        {siteConfig.story.map((item) => (
          <article key={item.title} className="rounded-2xl bg-rose-50 p-3">
            <Image src={item.image} alt={item.title} width={600} height={260} className="h-32 w-full rounded-xl object-cover" />
            <p className="mt-3 text-xs font-semibold text-rose-500">{item.date}</p>
            <h3 className="text-base font-semibold text-rose-700">{item.title}</h3>
            <p className="text-sm">{item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
