interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-1.5 rounded-full bg-progress-track overflow-hidden">
      <div
        className="h-full rounded-full bg-progress-fill transition-all duration-700 ease-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
