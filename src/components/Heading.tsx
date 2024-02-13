import React from "react";

interface HeadingProps {
  level: number;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level, className, children }) => {
  const TagName = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <TagName className={`text-2xl font-bold ${className}`}>{children}</TagName>
  );
};

export default Heading;
