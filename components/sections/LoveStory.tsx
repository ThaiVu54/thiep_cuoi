import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export function LoveStory() {
  return (
    <section className="section-card">
      <h2 className="section-title">Chuyện Tình Yêu</h2>
      <div className="gold-divider" />
      
      <div className="mt-6 space-y-8">
        {siteConfig.story.map((item, index) => (
          <article key={item.title} className="relative">
            {/* Timeline connector */}
            {index < siteConfig.story.length - 1 && (
              <div className="absolute left-[60px] top-[100px] w-0.5 h-full bg-primary/20" />
            )}
            
            <div className="flex gap-4">
              {/* Date badge */}
              <div className="flex-shrink-0 w-[120px] text-center">
                <div className="inline-block bg-primary text-cream px-3 py-1 text-xs font-medium">
                  {item.date}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                {/* Polaroid style image */}
                <div className="polaroid inline-block mb-4">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={200} 
                    height={150} 
                    className="w-full h-32 object-cover"
                  />
                </div>
                
                <h3 className="font-serif text-lg text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/80 leading-relaxed">{item.content}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
