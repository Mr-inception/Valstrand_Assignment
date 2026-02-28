import { JobStatus } from "@/lib/api";

const statusConfig: Record<JobStatus, { bg: string; text: string; pulse: boolean }> = {
  PENDING: { bg: "bg-status-pending-bg", text: "text-status-pending", pulse: false },
  PROCESSING: { bg: "bg-status-processing-bg", text: "text-status-processing", pulse: true },
  COMPLETED: { bg: "bg-status-completed-bg", text: "text-status-completed", pulse: false },
};

interface StatusBadgeProps {
  status: JobStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const colorKey = status.toLowerCase() as "pending" | "processing" | "completed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black tracking-widest transition-all duration-500 shadow-sm ${config.bg} ${config.text} ${config.pulse ? "animate-pulse-badge" : ""}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.pulse ? "bg-status-processing shadow-[0_0_8px_rgba(37,99,235,0.5)]" : `bg-status-${colorKey}`}`}
      />
      {status}
    </span>
  );
};

export default StatusBadge;

