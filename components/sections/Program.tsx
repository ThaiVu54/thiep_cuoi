import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
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
    <section className="section">
      <h2 className="section-title">Chương Trình</h2>
      <div className="divider" />

      <div className="card">
        <StaggerGroup className="space-y-0" stagger={0.15}>
          {timeline.map((event, index) => (
            <StaggerItem key={index} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Timeline dot + connector */}
              <div className="relative flex flex-col items-center">
                <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-sage" />
                {index < timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
              </div>

              <div className="min-w-[52px] pt-0.5 text-right">
                <span className="font-serif text-lg text-sage-deep">{event.time}</span>
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className="font-semibold text-ink">{event.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{event.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
