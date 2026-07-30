import Image from "next/image";

export function DressCode() {
  return (
    <section className="section-card">
      <h2 className="section-title">Dress Code</h2>
      <div className="gold-divider" />
      
      <p className="text-center text-sm text-ink/80 mb-6">
        Chúng mình rất mong quý khách đến tham dự với trang phục phù hợp, 
        tạo nên bầu không khí trang trọng và đẹp đẽ cho buổi tiệc.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Ladies */}
        <div className="card-burgundy text-center">
          <div className="mb-3">
            <svg className="w-16 h-16 mx-auto text-gold" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 20c-8 0-14 2-14 6v4h28v-4c0-4-6-6-14-6zm-8 14l-4 14h24l-4-14H24z" opacity="0.8"/>
            </svg>
          </div>
          <h3 className="font-serif text-lg text-gold mb-2">Quý Bà / Quý Cô</h3>
          <p className="text-sm text-cream/90">
            Váy dạ hội hoặc áo dài
          </p>
          <p className="text-xs text-cream/70 mt-2">
            Tông màu: Đỏ bordeaux, vàng gold, hoặc kem
          </p>
        </div>

        {/* Gentlemen */}
        <div className="card-burgundy text-center">
          <div className="mb-3">
            <svg className="w-16 h-16 mx-auto text-gold" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm12 20H20l-4 28h32l-4-28zm-12 4l2 8h-4l2-8z" opacity="0.8"/>
            </svg>
          </div>
          <h3 className="font-serif text-lg text-gold mb-2">Quý Ông</h3>
          <p className="text-sm text-cream/90">
            Vest lịch sự hoặc áo dài
          </p>
          <p className="text-xs text-cream/70 mt-2">
            Tông màu: Đen, xám đậm, hoặc navy
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 border border-primary/20 bg-cream-dark text-center">
        <p className="text-xs text-ink/70 italic">
          * Xin vui lòng tránh mặc màu trắng để nhường cho cô dâu nhé!
        </p>
      </div>
    </section>
  );
}
