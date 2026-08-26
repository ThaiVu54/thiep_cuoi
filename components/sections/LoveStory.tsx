"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site.config";

// Mỗi mốc thời gian xuất hiện cách nhau 0.18s
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

// Trong 1 mốc: badge ngày -> ảnh -> tiêu đề/nội dung lần lượt hiện ra
const itemVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const partVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function LoveStory() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section">
      <h2 className="section-title">Chuyện Tình Yêu</h2>
      <div className="divider" />

      <motion.div
        className="mt-6 space-y-8"
        initial={prefersReducedMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
        variants={listVariants}
      >
        {siteConfig.story.map((item, index) => (
          <motion.article key={item.title} className="relative" variants={itemVariants}>
            {/* Timeline connector */}
            {index < siteConfig.story.length - 1 && (
              <div className="absolute left-[60px] top-[100px] w-px h-full bg-line" />
            )}

            <div className="flex gap-4">
              {/* Date badge */}
              <motion.div variants={partVariants} className="flex-shrink-0 w-[120px] text-center">
                <div className="inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-medium text-sage-deep">
                  {item.date}
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <motion.div variants={partVariants} className="mb-4 overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover"
                  />
                </motion.div>

                <motion.div variants={partVariants}>
                  <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.content}</p>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
