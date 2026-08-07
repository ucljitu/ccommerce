import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function StatsCard({ title, value, change, positive = true, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <div className="stats-card bg-white rounded-xl border border-slate-200 p-6 flex items-start gap-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bgColor)}>
        <Icon className={cn("w-6 h-6", color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <div className={cn("flex items-center gap-1 mt-1 text-xs font-medium", positive ? "text-emerald-600" : "text-red-500")}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change} vs last month
        </div>
      </div>
    </div>
  );
}
