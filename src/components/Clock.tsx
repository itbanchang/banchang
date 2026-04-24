// ============================================================
// BCH 360° Intelligence V.10 — Clock Component (TypeScript)
// 🕐 แสดงเวลาปัจจุบัน อัปเดตทุกวินาที
// ============================================================
import { useState, useEffect, memo } from 'react';

const Clock = memo(function Clock(): JSX.Element {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const ticker = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(ticker);
  }, []);

  return (
    <p className="text-xs font-mono font-bold text-gray-700 mt-0.5">
      {time.toLocaleTimeString('th-TH')}
    </p>
  );
});

export default Clock;
