import { SVGMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { motion } from "framer-motion";

export type AnimatedCheckIconProps = {
  motionPathProps?: SVGMotionProps<SVGPathElement>;
  svgProps?: React.HTMLAttributes<HTMLOrSVGElement>;
};

export const AnimatedCheckIcon = forwardRef<
  SVGPathElement,
  AnimatedCheckIconProps
>(function CheckIcon(props, ref) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...props.svgProps}
    >
      <motion.path
        ref={ref}
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        {...props.motionPathProps}
      />
    </svg>
  );
});
