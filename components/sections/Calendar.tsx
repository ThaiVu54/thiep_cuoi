"use client";

import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
import { siteConfig } from "@/config/site.config";
import { useMemo, useState } from "react";

const DAYS_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTHS_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

export function Calendar() {
  const weddingDate = useMemo(() => new Date(siteConfig.weddingDate), []);
  const [currentMonth, setCurrentMonth] = useState(weddingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(weddingDate.getFullYear());

  const today = new Date();
  const weddingDay = weddingDate.getDate();
  const weddingMonth = weddingDate.getMonth();
  const weddingYear = weddingDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    
    // Empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  }, [daysInMonth, firstDayOfMonth]);

  const isWeddingMonth = currentMonth === weddingMonth && currentYear === weddingYear;
  const isToday = (day: number) => 
    day === today.getDate() && 
    currentMonth === today.getMonth() && 
    currentYear === today.getFullYear();

  const goToWeddingMonth = () => {
    setCurrentMonth(weddingMonth);
    setCurrentYear(weddingYear);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <section className="section">
      <div className="card">
        <StaggerGroup stagger={0.15}>
          {/* Month/Year header */}
          <StaggerItem className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 text-ink-muted transition-colors hover:text-sage-deep"
              aria-label="Tháng trước"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToWeddingMonth}
              className="font-serif text-xl text-ink transition-colors hover:text-sage-deep"
            >
              {MONTHS_VI[currentMonth]} {currentYear}
            </button>

            <button
              onClick={nextMonth}
              className="p-2 text-ink-muted transition-colors hover:text-sage-deep"
              aria-label="Tháng sau"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </StaggerItem>

          {/* Day headers */}
          <StaggerItem className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_VI.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-ink-muted">
                {day}
              </div>
            ))}
          </StaggerItem>

          {/* Calendar grid */}
          <StaggerItem className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-9 w-9" />;
              }

              const isWeddingDay = isWeddingMonth && day === weddingDay;
              const isTodayDate = isToday(day);

              return (
                <div
                  key={day}
                  className={`
                    relative flex h-9 w-9 cursor-default items-center justify-center rounded-full text-sm transition-all duration-200
                    ${isWeddingDay ? "bg-sage font-bold text-white scale-105 shadow-soft" : ""}
                    ${isTodayDate && !isWeddingDay ? "border border-blush text-ink" : ""}
                    ${!isWeddingDay && !isTodayDate ? "text-ink hover:bg-sage-soft" : ""}
                  `}
                >
                  {day}
                  {isWeddingDay && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-blush-soft">
                      ♥
                    </span>
                  )}
                </div>
              );
            })}
          </StaggerItem>

          {/* Wedding date highlight */}
          {isWeddingMonth && (
            <div className="mt-4 text-center">
              <div className="divider" />
              <p className="text-sm font-medium text-ink">
                Ngày cưới: {weddingDay}/{weddingMonth + 1}/{weddingYear}
              </p>
            </div>
          )}
        </StaggerGroup>
      </div>
    </section>
  );
}
