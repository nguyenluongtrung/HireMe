import { STEP_COLOR_PAIRS } from "@/contants";
import { IconType } from "react-icons";

interface JobSeekingStepProps {
  index: number
  title: string;
  description: string;
  icon?: IconType;
}

export function JobSeekingStep({
  index,
  icon: Icon,
  title,
  description,
}: JobSeekingStepProps) {
  return (
    <div className="rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-white hover:cursor-pointer group">
      <div
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4
          ${STEP_COLOR_PAIRS[index].bg} 
          group-hover:${STEP_COLOR_PAIRS[index].bg.replace("-100", "-200")} 
          transition-colors duration-300`}
      >
        {Icon && (
          <Icon
            className={`${STEP_COLOR_PAIRS[index].text} text-2xl mx-auto 
            group-hover:scale-110 
            transition-transform duration-300`}
          />
        )}
      </div>
      <p className="text-center font-medium text-lg group-hover:text-sky-700">
        {title}
      </p>
      <p className="text-gray-700 text-center mt-3">{description}</p>
    </div>
  );
}
