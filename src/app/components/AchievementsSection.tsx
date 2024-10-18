"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import react-animated-numbers without server-side rendering
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

// Define the type for achievement objects
interface Achievement {
  metric: string;
  value: string;
  prefix?: string;
  postfix?: string;
}

// Array of achievements
const achievementsList: Achievement[] = [
  {
    metric: "Projects",
    value: "10",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Users",
    value: "100,0",
  },
  {
    metric: "Awards",
    value: "3",
  },
  {
    metric: "Years",
    value: "2",
  },
];

// AchievementsSection component
const AchievementsSection: React.FC = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-2">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-white text-4xl font-bold flex flex-row">
              {achievement.prefix}
              <AnimatedNumbers
  includeComma
  animateToNumber={parseInt(achievement.value.replace(/,/g, ""))}
  locale="en-US"
  className="text-white text-4xl font-bold"
/>

              {achievement.postfix}
            </h2>
            <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
