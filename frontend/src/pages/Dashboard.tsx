import { useState, useEffect, useCallback } from "react";
import { api, Job } from "@/lib/api";
import JobCard from "@/components/JobCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Plus, LayoutGrid } from "lucide-react";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await api.getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 3000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  return (
    <div className="min-h-screen mesh-bg selection:bg-primary/20">
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <LayoutGrid className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                Job<span className="text-primary italic">Queue</span>
              </h1>
            </div>
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            New Job
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-8 py-12 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">
              System Monitor
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h3 className="text-4xl font-black text-foreground tracking-tight">
                Active Jobs
              </h3>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {jobs.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/10 shadow-sm backdrop-blur-sm self-center sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-completed opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-completed" />
            </span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Updates</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-32 rounded-[3rem] border-4 border-dashed border-primary/5 bg-white/30 backdrop-blur-sm">
            <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="h-10 w-10 text-primary/30" />
            </div>
            <p className="text-muted-foreground font-bold text-lg mb-6">The queue is currently empty</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-6 py-3 text-sm font-black text-primary hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest"
            >
              Initialize Factory
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
