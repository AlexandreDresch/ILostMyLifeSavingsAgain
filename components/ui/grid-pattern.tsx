import * as React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: [x: number, y: number][];
}

const GridPattern: React.FC<GridPatternProps> = ({
  width = 30,
  height = 30,
  x = 0,
  y = 0,
  squares = [],
  className,
  ...props
}) => {
  return (
    <svg className={cn("absolute inset-0 size-full", className)} {...props}>
      {squares.map(([sx, sy], index) => (
        <rect
          key={`square-${sx}-${sy}-${index}`}
          x={sx * width + x}
          y={sy * height + y}
          width={width}
          height={height}
          className={cn("fill-border/50 stroke-border", className)}
        />
      ))}
    </svg>
  );
};

export { GridPattern };
