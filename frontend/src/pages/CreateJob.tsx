import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Plus } from "lucide-react";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await api.createJob({ title: title.trim(), description: description.trim() });
      toast({
        title: "Creation Successful ✨",
        description: `"${title.trim()}" is now in the queue.`,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "System Error",
        description: "Communication with the queue failed. Please retry.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg selection:bg-primary/20">
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <div className="bg-secondary p-1.5 rounded-lg group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span>Dashboard</span>
          </Link>
          <div className="text-right">
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/50">Step 01</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 sm:px-8 py-20 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-10 text-center">
          <div className="bg-primary/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-inner">
            <Plus className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">
            Initialize New <span className="text-primary italic">Job</span>
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto font-medium">
            Define your task parameters and submit them to our automated tracking system.
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
          {/* Processing Bar Overlay */}
          {submitting && (
            <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 w-1/3 animate-[slide_1.5s_infinite_linear]" />
            </div>
          )}

          {/* Decorative glow */}
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            <div className="space-y-2">
              <label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                Job Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master Logic Engine"
                required
                className="w-full rounded-2xl border-2 border-border/50 bg-white/50 px-5 py-4 text-base font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                Extended Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the operational scope..."
                rows={4}
                className="w-full rounded-2xl border-2 border-border/50 bg-white/50 px-5 py-4 text-base font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-5 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {submitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5 stroke-[2.5]" />
              )}
              {submitting ? "SUBMITTING..." : "CONFIRM & DEPLOY"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateJob;
