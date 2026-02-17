import React, { useState } from "react";

function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const candidates = ["projects", "about", "contact", "skills"];
    const match = candidates.find((id) => id.includes(q) || q.includes(id));

    if (match) {
      document.getElementById(match)?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(`No direct section match for: "${query}"`);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
        >
          <div className="flex items-center pl-2 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 4.125 12.094l4.015 4.016a.75.75 0 1 0 1.06-1.06l-4.015-4.016A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            id="search"
            name="search"
            data-cobrowse-field="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, about, contact..."
            className="w-full bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center text-center px-4 py-14">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            John Doe
          </h1>

          <p className="mt-3 text-xl text-slate-600 sm:text-2xl md:text-3xl">
            Full Stack Developer & UI/UX Designer
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
            Welcome to my portfolio! I'm a passionate developer with expertise
            in React, Node.js, and modern web technologies. Explore my projects
            and get in touch to collaborate.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-700">
              View My Work
            </button>

            <button className="rounded-xl border-2 border-blue-600 px-8 py-3 font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
