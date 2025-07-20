import { IconType } from "react-icons";

interface JobSeekingStepProps {
  title: string;
  description: string;
  icon?: IconType;
}

export function JobSeekingStep({
  icon: Icon,
  title,
  description,
}: JobSeekingStepProps) {
  return (
    <div className="rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-white hover:cursor-pointer group">
      {Icon && <Icon className="text-secondary group-hover:text-purple-900 transition-transform duration-300 group-hover:-translate-y-1 text-5xl mx-auto mb-2" />}
      <p className="text-center font-medium text-lg group-hover:text-sky-700">{title}</p>
      <p className="text-gray-700 text-center mt-3">{description}</p>
    </div>
  );
}
