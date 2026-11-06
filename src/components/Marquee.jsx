const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Go",
  "Node.js",
  "Express",
  "Socket.io",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Tailwind",
  "Figma",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="mq" aria-hidden="true">
      <div>
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
