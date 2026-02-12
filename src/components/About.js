import React from "react";

function About() {
  const skills = [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Python",
    "MongoDB",
    "AWS",
    "Docker",
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white " style={{ backgroundColor: "black" }} id="about">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            About Me
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            I build clean, scalable web apps with a focus on performance,
            maintainability, and a solid user experience.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Main card */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-5">
              <p className="text-base leading-7 text-slate-700 sm:text-lg">
                I'm a full-stack developer with experience building modern web
                applications. I specialize in React, Node.js, and cloud
                technologies.
              </p>

              <p className="text-base leading-7 text-slate-700 sm:text-lg">
                My journey in tech started with curiosity about how websites
                work, and it has evolved into creating user-friendly, scalable
                products.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Skills
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
              What I care about
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span>Writing clean, readable code</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                <span>Building fast, responsive UIs</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                <span>Shipping features that scale</span>
              </li>
            </ul>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">Currently</p>
              <p className="mt-1 text-sm text-slate-600">
                Open to internships / junior roles & freelance projects.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default About;
