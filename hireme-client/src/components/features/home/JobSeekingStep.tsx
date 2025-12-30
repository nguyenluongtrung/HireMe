import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconType } from "react-icons";

import { STEP_COLOR_PAIRS } from "@/contants";

interface JobSeekingStepProps {
  index: number
  step: {
    icon: IconType;
    title: string;
    authRequired: boolean;
    href: string;
    description: string;
  }
  onOpenLoginModal: () => void
}

export function JobSeekingStep({
  index,
  step,
  onOpenLoginModal
}: JobSeekingStepProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const handleClickStep = () => {
    if ((step.authRequired || step.href === "") && !session) {
      onOpenLoginModal()
    } else {
      router.push(step.href);
    }
  }
  return (
    <div className="rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-white hover:cursor-pointer group"
      onClick={handleClickStep}
    >
      <div
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4
          ${STEP_COLOR_PAIRS[index].bg} 
          group-hover:${STEP_COLOR_PAIRS[index].bg.replace("-100", "-200")} 
          transition-colors duration-300`}
      >
        {step.icon && (
          <step.icon
            className={`${STEP_COLOR_PAIRS[index].text} text-2xl mx-auto 
            group-hover:scale-110 
            transition-transform duration-300`}
          />
        )}
      </div>
      <p className="text-center font-medium text-lg group-hover:text-sky-700">
        {step.title}
      </p>
      <p className="text-gray-700 text-center mt-3">{step.description}</p>
    </div>
  );
}
