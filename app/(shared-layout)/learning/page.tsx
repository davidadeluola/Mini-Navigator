"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useQuery, useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import {
  CalendarDays,
  BookOpen,
  PenLine,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function LearningPage() {
  const { isAuthenticated } = useConvexAuth();
  const learnings = useQuery(api.learnings.getLearnings);
  const createLearning = useMutation(api.learnings.createLearning);

  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Page header animation ───
      const headerTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      headerTl
        .from(".learning-tag", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".learning-title",
          { y: 40, opacity: 0, duration: 0.7 },
          "-=0.3"
        )
        .from(
          ".learning-subtitle",
          { y: 25, opacity: 0, duration: 0.6 },
          "-=0.4"
        );

      // ─── Form card entrance ───
      if (formRef.current) {
        gsap.from(formRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      // ─── Timeline entries ───
      if (timelineRef.current) {
        ScrollTrigger.batch(".timeline-entry", {
          onEnter: (elements) => {
            gsap.from(elements, {
              x: -40,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
          start: "top 88%",
          once: true,
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, [learnings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    startTransition(async () => {
      try {
        await createLearning({ date, title: title.trim(), content: content.trim() });
        toast.success("Learning entry saved!");
        setTitle("");
        setContent("");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to save entry");
        }
      }
    });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isLoading = learnings === undefined;

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1] relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="orb orb-violet -top-20 -right-40 opacity-20" />
      <div className="orb orb-blue bottom-40 -left-60 opacity-15" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* ═══ PAGE HEADER ═══ */}
        <div className="mb-12">
          <span className="learning-tag inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-violet-400 mb-6 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5">
            <BookOpen className="w-3.5 h-3.5" />
            Daily Journal
          </span>
          <h1 className="learning-title text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Learning Log
          </h1>
          <p className="learning-subtitle text-base text-white/40 leading-relaxed max-w-lg">
            Track what you learn each day. Pick a date, write it down, build the
            habit. Your future self will thank you.
          </p>
        </div>

        {/* ═══ ENTRY FORM ═══ */}
        <div ref={formRef}>
          {!isAuthenticated ? (
            <div className="glass-card p-10 text-center mb-16">
              <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Sign in to start logging
              </h3>
              <p className="text-sm text-white/35 mb-6 max-w-sm mx-auto">
                Create an account or sign in to begin capturing your daily
                learnings.
              </p>
              <Link
                href="/auth/login"
                className={buttonVariants({
                  className:
                    "bg-violet-600 hover:bg-violet-500 text-white border-0",
                })}
              >
                Sign in
              </Link>
            </div>
          ) : (
            <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-sm mb-16">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-violet-400" />
                  New Entry
                </CardTitle>
                <CardDescription className="text-white/35">
                  What did you learn today?
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Date picker */}
                  <div className="space-y-2">
                    <label
                      htmlFor="learning-date"
                      className="text-sm font-medium text-white/60 flex items-center gap-2"
                    >
                      <CalendarDays className="w-4 h-4 text-violet-400" />
                      Which day?
                    </label>
                    <Input
                      id="learning-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label
                      htmlFor="learning-title"
                      className="text-sm font-medium text-white/60"
                    >
                      Topic / Title
                    </label>
                    <Input
                      id="learning-title"
                      type="text"
                      placeholder="e.g. React Server Components"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-11 placeholder:text-white/20 focus:border-violet-500/50 transition-colors"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label
                      htmlFor="learning-content"
                      className="text-sm font-medium text-white/60"
                    >
                      What did you learn?
                    </label>
                    <Textarea
                      id="learning-content"
                      placeholder="Write your thoughts, key takeaways, code snippets..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="bg-white/5 border-white/10 text-white min-h-32 placeholder:text-white/20 focus:border-violet-500/50 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className={buttonVariants({
                      className:
                        "w-full bg-violet-600 hover:bg-violet-500 text-white border-0 h-11 text-sm font-medium transition-all",
                    })}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Save Entry
                      </>
                    )}
                  </button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ═══ LEARNING TIMELINE ═══ */}
        <div ref={timelineRef}>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Timeline
            </h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="glass-card p-6 animate-pulse space-y-3"
                >
                  <div className="h-4 w-1/4 rounded bg-white/5" />
                  <div className="h-5 w-2/3 rounded bg-white/5" />
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-3/4 rounded bg-white/5" />
                </div>
              ))}
            </div>
          ) : learnings && learnings.length > 0 ? (
            <div className="relative pl-10 space-y-6">
              {/* Vertical timeline line */}
              <div className="timeline-line" />

              {learnings.map((entry) => (
                <div key={entry._id} className="timeline-entry relative">
                  {/* Timeline dot */}
                  <div className="timeline-dot" />

                  {/* Entry card */}
                  <div className="glass-card p-5 ml-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] tracking-widest uppercase text-violet-400 font-medium">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white/90 mb-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-10 text-center">
              <BookOpen className="w-8 h-8 text-white/15 mx-auto mb-4" />
              <p className="text-white/35 text-sm">
                No learning entries yet. Start logging what you learn!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 max-w-3xl mx-auto flex items-center justify-between relative z-10">
        <span className="text-xs text-white/20">© 2026 MiniNavigator</span>
        <Link
          href="/"
          className="text-xs text-white/15 hover:text-white/30 transition-colors"
        >
          Back to home
        </Link>
      </footer>
    </div>
  );
}
