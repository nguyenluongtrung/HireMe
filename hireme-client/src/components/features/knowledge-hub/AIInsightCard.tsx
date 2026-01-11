import { Lightbulb, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIInsightCardProps {
    title: string;
    content: string;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
}

export const AIInsightCard = ({ title, content, actionLabel, onAction, onDismiss }: AIInsightCardProps) => {
    return (
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-5 mb-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                    <div className="bg-blue-600/20 p-2 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{content}</p>
                    </div>
                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Actions */}
                {(actionLabel || onAction) && (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={onAction}
                            className="bg-blue-600 hover:bg-blue-500 text-white h-9 gap-2 shadow-lg shadow-blue-900/20"
                        >
                            <Mail className="h-4 w-4" />
                            {actionLabel || "Generate Counter-Email"}
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-slate-400 hover:text-white hover:bg-slate-800/50 h-9"
                        >
                            Dismiss
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
