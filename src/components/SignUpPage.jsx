import React from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full bg-white text-zinc-900 font-sans">
      {/* --- Right Column: Brand Visual (Hidden on Mobile) --- */}
      <div className="hidden h-full flex-col bg-zinc-950 p-12 text-white lg:flex lg:w-1/2 justify-between">
        <div className="flex items-center text-lg font-medium">
          <svg
            className="mr-2 h-6 w-6"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
          MythCraft
        </div>

        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-xl font-light italic leading-relaxed">
              &ldquo;The easiest way to manage, scale, and monetize your
              Minecraft community. Built for server owners, by server
              owners.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              — Project MythCraft Team
            </footer>
          </blockquote>
        </div>
      </div>
      {/* --- Left Column: Authentication Form --- */}
      <div className="flex w-full flex-col justify-between p-8 lg:w-1/2 lg:p-12">
        {/* Branding */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white text-xs">
            MC
          </div>
          <span>DrAmanJy</span>
        </div>

        {/* Center Form Container */}
        <div className="mx-auto flex w-full max-w-100 flex-col justify-center space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
            <p className="text-sm text-zinc-500">
              Enter your email below to access your dashboard
            </p>
          </div>

          <div className="grid gap-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="xyz"
                  maxLength={27}
                  className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="me@example.com"
                  maxLength={27}
                  className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="passowrd"
                  type="password"
                  placeholder="password"
                  maxLength={27}
                  className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <button className="inline-flex h-11 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                Signup with Email
              </button>
            </form>

            {/* Visual Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <button className="inline-flex h-11 w-full items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 hover:text-black">
              {/* Optional: Insert GitHub SVG here */}
              GitHub
            </button>
          </div>

          <p className="px-8 text-center text-sm text-zinc-500 leading-relaxed">
            Have an account?{" "}
            <Link
              to={"/auth?type=login"}
              className="font-semibold text-black underline underline-offset-4 hover:opacity-80"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer info (Optional) */}
        <div className="text-center text-xs text-zinc-400">
          © 2026 MythCraft SaaS. All rights reserved.
        </div>
      </div>
    </div>
  );
}
