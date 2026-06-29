import React from "react";
import { motion } from "motion/react";

export const clientLogos = [
  `${import.meta.env.BASE_URL}logos/ASSEK_Logo.PNG-and-Transparent-2.png`,
  `${import.meta.env.BASE_URL}logos/Bandari Beauty.jpg`,
  `${import.meta.env.BASE_URL}logos/Beldinas Delicacies.png`,
  `${import.meta.env.BASE_URL}logos/Design Source Logo.jpg`,
  `${import.meta.env.BASE_URL}logos/IYBA Seed Logo.png`,
  `${import.meta.env.BASE_URL}logos/Kenswed Organization Logo.png`,
  `${import.meta.env.BASE_URL}logos/Kenya Climate Ventures Logo.png`,
  `${import.meta.env.BASE_URL}logos/Kibeti Logo.png`,
  `${import.meta.env.BASE_URL}logos/Kilimani Project Foundation Logo.png`,
  `${import.meta.env.BASE_URL}logos/Kiota School Logo.png`,
  `${import.meta.env.BASE_URL}logos/Little Einsteins Logo.png`,
  `${import.meta.env.BASE_URL}logos/Luna Medical Spa Logo.jpg`,
  `${import.meta.env.BASE_URL}logos/Luxe Nail Spa Logo.png`,
  `${import.meta.env.BASE_URL}logos/Mofit Logo.png`,
  `${import.meta.env.BASE_URL}logos/Olive Tree Media Logo.jpg`,
  `${import.meta.env.BASE_URL}logos/Pivot Assets Logo.png`,
  `${import.meta.env.BASE_URL}logos/St Hannahs  Logo.jpg`,
  `${import.meta.env.BASE_URL}logos/Value 8 Logo.jpg`,
  `${import.meta.env.BASE_URL}logos/eldohub logo.png`,
  `${import.meta.env.BASE_URL}logos/six one Logo.jpg`,
  `${import.meta.env.BASE_URL}logos/wylde-international Logo.png`,
];

interface ClientRiverProps {
  logos?: string[];
  direction?: "left" | "right";
  speed?: "normal" | "slow";
}

export const ClientRiver: React.FC<ClientRiverProps> = ({
  logos = clientLogos,
  direction = "left",
  speed = "normal",
}) => {
  // Double the array to ensure smooth infinite scrolling with translateX(-50%)
  const scrollContent = [...logos, ...logos];

  const animationClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  const speedClass = speed === "slow" ? "duration-[60s]" : "";

  return (
    <div className="flex whitespace-nowrap overflow-hidden py-2">
      <div className={`flex ${animationClass} items-center`}>
        {scrollContent.map((logo, idx) => (
          <div
            key={`${logo}-${idx}`}
            className="w-20 md:w-28 mx-4 md:mx-6 flex-shrink-0 flex items-center justify-center h-10 md:h-12 group"
          >
            <img
              src={logo}
              alt="Client Logo"
              className="max-w-full max-h-full object-contain grayscale opacity-50 mix-blend-multiply transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal cursor-pointer"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
