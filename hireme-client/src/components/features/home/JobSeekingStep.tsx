import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface JobSeekingStepProps {
  step: {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    title: string;
    desc: string;
    iconColor: string;
    bgFrom: string;
  }
  onOpenLoginModal: () => void
}

export function JobSeekingStep({
  step,
}: JobSeekingStepProps) {
  return (
    <div
      className="group relative bg-[#151e32] border border-slate-800 hover:border-slate-600 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer hover:shadow-black/20"
    >
      {/* Gradient Overlay on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-b ${step.bgFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`} />

      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B1120] border border-slate-700 group-hover:border-slate-500 transition-colors shadow-inner">
          <step.icon className={`h-6 w-6 ${step.iconColor}`} />
        </div>

        <h3 className="text-lg font-bold mb-3 text-slate-100 group-hover:text-white transition-colors">
          {step.title}
        </h3>

        <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

