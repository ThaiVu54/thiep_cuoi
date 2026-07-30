import { siteConfig } from "@/config/site.config";

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
};

// Dựa vào events trong config, tạo timeline chi tiết
const generateTimeline = (): TimelineEvent[] => {
  const events = siteConfig.events;
  const timeline: TimelineEvent[] = [];

  events.forEach((event) => {
    const date = new Date(event.date);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    timeline.push({
      time,
      title: event.title,
      description: event.address,
    });
  });

  // Thêm các mốc thời gian mặc định nếu chỉ có 2 sự kiện chính
  if (timeline.length === 2) {
    // Thêm đón khách trước lễ vu quy 30 phút
    const firstEvent = new Date(events[0].date);
    firstEvent.setMinutes(firstEvent.getMinutes() - 30);
    const welcomeTime = `${firstEvent.getHours().toString().padStart(2, "0")}:${firstEvent.getMinutes().toString().padStart(2, "0")}`;
    
    timeline.unshift({
      time: welcomeTime,
      title: "Đón khách",
      description: "Chào đón quý khách và phục vụ trà bánh",
    });

    // Thêm kết thúc sau tiệc cưới 3 giờ
    const lastEvent = new Date(events[events.length - 1].date);
    lastEvent.setHours(lastEvent.getHours() + 3);
    const endTime = `${lastEvent.getHours().toString().padStart(2, "0")}:${lastEvent.getMinutes().toString().padStart(2, "0")}`;
    
    timeline.push({
      time: endTime,
      title: "Tiễn khách",
      description: "Cảm ơn quý khách đã đến chung vui",
    });
  }

  return timeline;
};

export function Program() {
  const timeline = generateTimeline();

  return (
    <section className="card-burgundy">
      <h2 className="font-serif text-2xl text-center text-gold mb-2">Chương Trình</h2>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6" />

      <div className="space-y-0">
        {timeline.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="flex items-start gap-4">
              <div className="min-w-[60px] text-right">
                <span className="font-serif text-xl text-gold">{event.time}</span>
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className="font-semibold text-cream">{event.title}</h3>
                <p className="text-sm text-cream/70 mt-1">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Override timeline styles for burgundy background */}
      <style jsx>{`
        .timeline-item::before {
          background-color: #D4AF37;
          border-color: #FDF8F3;
        }
        .timeline-item::after {
          background-color: rgba(253, 248, 243, 0.3);
        }
      `}</style>
    </section>
  );
}
