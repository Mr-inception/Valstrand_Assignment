import { Job } from "@/lib/api";
import StatusBadge from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";
import { Clock, BarChart3 } from "lucide-react";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="group relative glass rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

      <div className="relative flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base tracking-tight truncate mb-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <p className="relative text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
        {job.description}
      </p>

      <div className="relative flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Analytics ready</span>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
      </div>
    </div>
  );
};

export default JobCard;

