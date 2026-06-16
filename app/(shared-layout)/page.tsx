"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { excerpt } from "@/lib/excerpt";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1780328766286-23e6cb082cb9?w=400&auto=format&fit=crop&q=60";

const tagColors: Record<string, string> = {
  Building: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  Tech: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  Craft: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Life: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Design: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  Tutorial: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

import { authClient } from "@/lib/auth-client";

export default function MiniNavigatorHome() {
  const { data: session } = authClient.useSession();
  
  // If authenticated, get their posts. If not, don't run query (returns undefined).
  const posts = useQuery(api.posts.getPosts, session?.user ? { authorId: session.user.id } : "skip");
  const heroRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Hero timeline ───
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .set(".gsap-hero-text, .gsap-hero-sub, .gsap-hero-cta", {
          visibility: "visible",
        })
        .from(".hero-tag", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".hero-title-line",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.3"
        )
        .from(
          ".gsap-hero-sub",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".gsap-hero-cta",
          {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-divider",
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.2"
        )
        .from(
          ".hero-pulse",
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
          },
          "-=0.4"
        );

      // ─── Orbs float-in ───
      gsap.from(".orb", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
      });

      // ─── Posts section ───
      if (postsRef.current) {
        gsap.set(".gsap-section", { visibility: "visible" });

        ScrollTrigger.batch(".post-card-anim", {
          onEnter: (elements) => {
            gsap.from(elements, {
              y: 60,
              opacity: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
          start: "top 85%",
          once: true,
        });

        // Section header
        gsap.from(".posts-header", {
          scrollTrigger: {
            trigger: ".posts-header",
            start: "top 85%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      // ─── About section ───
      if (aboutRef.current) {
        gsap.from(aboutRef.current, {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            once: true,
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [posts]);

  const dummyPosts = [
    {
      _id: "dummy_1",
      title: "Building an Agentic Coding Assistant",
      content: "A deep dive into how I built this AI coding assistant using Convex, Next.js, and better-auth. The architecture is surprisingly simple once you get the pieces right.",
      tag: "Building",
      _creationTime: Date.now() - 86400000 * 2, // 2 days ago
      imageUrl: null,
    },
    {
      _id: "dummy_2",
      title: "Why Glassmorphism is Making a Comeback",
      content: "Minimalism is great, but sometimes you just want things to look premium. Exploring dark mode glassmorphism with Tailwind CSS and GSAP.",
      tag: "Design",
      _creationTime: Date.now() - 86400000 * 5,
      imageUrl: null,
    },
    {
      _id: "dummy_3",
      title: "Mastering Convex in 2026",
      content: "Convex has changed how I build full-stack apps. No more fighting with Postgres migrations. Here is my standard boilerplate and setup.",
      tag: "Tech",
      _creationTime: Date.now() - 86400000 * 10,
      imageUrl: null,
    },
  ];

  // If unauthenticated, use dummy posts. If authenticated, use real posts (up to 3).
  const displayPosts = session ? posts?.slice(0, 3) : dummyPosts;
  const isLoading = session ? posts === undefined : false;

  return (
    <main
      ref={heroRef}
      className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1] font-sans overflow-hidden"
    >
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-32 pb-28 px-6 max-w-4xl mx-auto">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Floating orbs */}
        <div className="orb orb-violet -top-40 -left-60" />
        <div className="orb orb-blue top-20 -right-40" />
        <div className="orb orb-pink bottom-0 left-1/3" />

        <div className="relative z-10">
          {/* Tag */}
          <div className="hero-tag gsap-hero-text">
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-violet-400 mb-8 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5">
              <Sparkles className="w-3.5 h-3.5" />
              Personal blog & journal
            </span>
          </div>

          {/* Title */}
          <h1 className="gsap-hero-text text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-8">
            <span className="hero-title-line block">Ideas that don&apos;t fit</span>
            <span className="hero-title-line block text-white/25">
              anywhere else.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="gsap-hero-sub text-lg md:text-xl text-white/45 leading-relaxed max-w-xl mb-10">
            Building things, figuring stuff out, and writing about it. Raw
            thoughts on code, craft, and whatever Lagos throws at me.
          </p>

          {/* CTA Buttons */}
          <div className="gsap-hero-cta flex flex-wrap items-center gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white text-sm font-medium transition-all hover:bg-violet-500 hover:gap-3 hover:shadow-lg hover:shadow-violet-500/25"
            >
              Read the blog
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/learning"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium transition-all hover:border-white/20 hover:text-white/80 hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4" />
              Learning journal
            </Link>
          </div>

          {/* Divider */}
          <div className="mt-16 flex items-center gap-4">
            <div className="hero-divider h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="hero-pulse w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <div className="hero-divider h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══ RECENT POSTS ═══ */}
      <section
        ref={postsRef}
        className="gsap-section px-6 max-w-4xl mx-auto pb-24"
      >
        {/* Section header */}
        <div className="posts-header flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-violet-400 mb-2">
              Latest
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Recent Posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-violet-400 transition-colors"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Posts grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="glass-card p-5 space-y-4 animate-pulse"
              >
                <div className="w-full aspect-video rounded-lg bg-white/5" />
                <div className="h-5 w-3/4 rounded bg-white/5" />
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-2/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : displayPosts && displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post) => (
              <Link
                key={post._id}
                href={session ? `/blog/${post._id}` : "#"}
                className="post-card-anim"
              >
                <article className="post-card glass-card overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="w-full aspect-video relative overflow-hidden">
                    <Image
                      src={post.imageUrl ?? FALLBACK_IMAGE}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Tag */}
                    {post.tag && (
                      <span
                        className={`inline-flex w-fit text-[10px] font-medium px-2.5 py-0.5 rounded-full border mb-3 ${
                          tagColors[post.tag] ??
                          "border-white/15 bg-white/5 text-white/50"
                        }`}
                      >
                        {post.tag}
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-white/90 leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed flex-1 line-clamp-3 mb-4">
                      {excerpt(post.content, 100)}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-violet-400 font-medium">
                      Read more
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center border-dashed border-white/10 bg-white/[0.01]">
            <p className="text-white/60 text-lg font-medium mb-3">Your top three posts will be displayed here.</p>
            <p className="text-white/30 text-sm mb-6 max-w-sm mx-auto">
              You haven&apos;t written any posts yet. Start sharing your ideas and they will show up on your home page.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              Click here to create your first post
            </Link>
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-violet-400 transition-colors"
          >
            View all posts
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section
        ref={aboutRef}
        id="about"
        className="border-t border-white/5 px-6 py-20 max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar with gradient border */}
          <div className="gradient-border shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#0a0a0b] flex items-center justify-center">
              <span className="text-violet-400 font-bold text-xl">D</span>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-2">
              Written by
            </p>
            <h3 className="text-xl text-white font-semibold mb-3">
              David Adeluola
            </h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-lg">
              Computer engineering student, product engineer, and builder of
              things nobody asked for. Somewhere in Lagos, figuring it out.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/5 px-6 py-8 max-w-4xl mx-auto flex items-center justify-between">
        <span className="text-xs text-white/20">© 2026 MiniNavigator</span>
        <span className="text-xs text-white/15">Built by David</span>
      </footer>
    </main>
  );
}