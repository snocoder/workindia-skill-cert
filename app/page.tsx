"use client";

import { useState, useEffect, useRef } from "react";
import { SKILLS, CLUSTERS, ALL_SKILLS, QUESTIONS_BY_SKILL, getQuestionsFor, REVIEWS, type Skill, type Pending, type UserType, type ResultType, type ScreenId, type Question } from "@/lib/data";

export default function Home() {
  const [user, setUser] = useState<UserType>("free");
  const [result, setResult] = useState<ResultType>("pass");
  const [skill, setSkill] = useState<{ name: string; icon: string }>({ name: "MS Excel", icon: "📊" });
  const [screen, setScreen] = useState<ScreenId>("landing");
  const [prevScreen, setPrevScreen] = useState<ScreenId | null>(null);
  const [pending, setPending] = useState<Pending[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState(-1);
  const [timer, setTimer] = useState(40);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [sampleOpen, setSampleOpen] = useState(false);
  const [dnavOpen, setDnavOpen] = useState(false);
  const [browseQuery, setBrowseQuery] = useState("");
  const [browseFilter, setBrowseFilter] = useState("All");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (screen !== "quiz") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    const seconds = ALL_SKILLS.find((s) => s.name === skill.name)?.perQSec ?? 40;
    setTimer(seconds);
    setSel(-1);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [qIdx, screen, skill.name]);

  useEffect(() => {
    if (screen === "resultPass") {
      setPending((prev) =>
        prev.find((p) => p.name === skill.name)
          ? prev
          : [...prev, { name: skill.name, icon: skill.icon, score: "13/15", date: "May 2026" }]
      );
    }
    if (screen === "success") {
      setPending((prev) => prev.filter((p) => p.name !== skill.name));
    }
  }, [screen, skill]);

  const go = (id: ScreenId) => {
    setDnavOpen(false);
    if (id === screen) return;
    setPrevScreen(screen);
    setScreen(id);
    if (id === "quiz") {
      setQIdx(0);
      setSel(-1);
    }
  };

  const pickSkill = (name: string, icon: string) => setSkill({ name, icon });
  const pick = (i: number) => setSel(i);

  const activeQuestions: Question[] = getQuestionsFor(skill.name);
  const activeSkill: Skill | undefined = ALL_SKILLS.find((s) => s.name === skill.name);

  // Browse filter logic
  const CHIP_TO_CLUSTER: Record<string, string> = {
    Accounts: "Accounts & Finance",
    Computer: "Computer & Office",
    Sales: "Sales & Customer Service",
    "Tech & IT": "Tech & IT",
    Design: "Design & Creative",
    Marketing: "Digital Marketing",
    HR: "HR & Recruitment",
    Operations: "Operations",
  };
  const q = browseQuery.trim().toLowerCase();
  const filteredClusters = CLUSTERS.map((c) => {
    const matchesChip = browseFilter === "All" || c.title === CHIP_TO_CLUSTER[browseFilter];
    if (!matchesChip) return { ...c, skills: [] };
    const filteredSkills = !q ? c.skills : c.skills.filter((s) => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
    return { ...c, skills: filteredSkills };
  }).filter((c) => c.skills.length > 0);
  const totalMatches = filteredClusters.reduce((acc, c) => acc + c.skills.length, 0);

  const nextQ = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (qIdx + 1 >= activeQuestions.length) {
      go(result === "pass" ? "resultPass" : "resultFail");
      return;
    }
    setQIdx(qIdx + 1);
  };

  const resetQuiz = () => {
    setQIdx(0);
    setSel(-1);
  };

  const togglePendingDemo = () => {
    if (pending.length === 0) setPending([{ name: "Tally", icon: "🧮", score: "12/15", date: "May 2026" }]);
    else if (pending.length === 1)
      setPending([...pending, { name: "GST", icon: "🧾", score: "13/15", date: "May 2026" }]);
    else setPending([]);
  };

  const screenClass = (id: ScreenId) =>
    "screen" + (screen === id ? " active" : "") + (prevScreen === id && screen !== id ? " exit-left" : "");

  return (
    <>
      <div className="dnav">
        <button className="dnav-toggle" onClick={() => setDnavOpen(!dnavOpen)}>🧭</button>
        {dnavOpen && (
          <div className="dnav-menu">
            <div style={{ padding: "6px 12px", fontWeight: 800, color: "#fff", fontSize: 12, borderBottom: "1px solid #1E293B", marginBottom: 4 }}>Screens</div>
            <button onClick={() => go("landing")}>1. Landing</button>
            <button onClick={() => go("browse")}>2. Browse All</button>
            <button onClick={() => go("detail")}>3. Test Detail</button>
            <button onClick={() => go("quiz")}>4. Quiz</button>
            <button onClick={() => go("resultPass")}>5A. Pass</button>
            <button onClick={() => go("resultFail")}>5B. Fail</button>
            <button onClick={() => go("success")}>6. Success</button>
          </div>
        )}
      </div>

      <div className="phone">
        {/* ===== LANDING ===== */}
        <div className={screenClass("landing")}>
          <div className="demo-bar" style={{ paddingTop: 8 }}>
            <span style={{ fontSize: 10, color: "#64748B", fontWeight: 700, letterSpacing: ".05em" }}>DEMO:</span>
            <button className={`demo-chip ${user === "free" ? "on" : ""}`} onClick={() => setUser("free")}>Free</button>
            <button className={`demo-chip ${user === "p2" ? "on" : ""}`} onClick={() => setUser("p2")}>Premium(1)</button>
            <button className={`demo-chip ${user === "p0" ? "on" : ""}`} onClick={() => setUser("p0")}>Premium(0)</button>
            <div className="demo-div" />
            <button className={`demo-chip ${result === "pass" ? "on" : ""}`} onClick={() => setResult("pass")}>Pass</button>
            <button className={`demo-chip ${result === "fail" ? "on" : ""}`} onClick={() => setResult("fail")}>Fail</button>
            <div className="demo-div" />
            <button className={`demo-chip ${pending.length ? "on" : ""}`} onClick={togglePendingDemo}>
              {pending.length === 0 ? "+ Pending Pass" : `Pending: ${pending.length}`}
            </button>
          </div>

          <div style={{ background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", padding: "18px 20px 22px", color: "#fff" }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 17, fontWeight: 800 }}>Certifications</span>
            </div>
            <p style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.25, margin: 0 }}>
              Get verified.<br />Get found. Get hired.
            </p>
          </div>

          <div style={{ borderBottom: "1px solid var(--g100)", background: "#fff" }}>
            <div className="trust-wrap">
              <div className="trust-strip">
                {[0, 1].map((dup) => (
                  <div key={dup} style={{ display: "flex", gap: 24, flexShrink: 0 }}>
                    <div className="trust-item"><span style={{ fontSize: 16 }}>✅</span> <span><strong>12,400+</strong> candidates certified</span></div>
                    <div className="trust-item"><span style={{ fontSize: 16 }}>📈</span> <span>Verified candidates get shortlisted <strong>3x more</strong></span></div>
                    <div className="trust-item"><span style={{ fontSize: 16 }}>🏢</span> <span>Trusted by employers on WorkIndia</span></div>
                    <div className="trust-item"><span style={{ fontSize: 16 }}>⚡</span> <span>Average hire time <strong>under 7 days</strong></span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: "var(--g50)" }}>
            {pending.length > 0 && (
              <div style={{ padding: "14px 20px 0" }}>
                {pending.map((p) => {
                  let actionLabel = "", actionBg = "var(--brand)", extraNote = "";
                  let onClick = () => {};
                  if (user === "free") {
                    actionLabel = "🔓 Unlock Certificate";
                    extraNote = "Premium or Rs 99 to unlock";
                    onClick = () => { pickSkill(p.name, p.icon); setUnlockOpen(true); };
                  } else if (user === "p2") {
                    actionLabel = "💎 Use credit & unlock";
                    actionBg = "linear-gradient(135deg,#7C3AED,#6D28D9)";
                    extraNote = "Your free credit this month";
                    onClick = () => { pickSkill(p.name, p.icon); go("success"); };
                  } else {
                    actionLabel = "🔓 Unlock — Rs 49";
                    extraNote = "Premium discount price";
                    onClick = () => { pickSkill(p.name, p.icon); go("success"); };
                  }
                  return (
                    <div key={p.name} style={{ background: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", border: "1.5px solid #86EFAC", borderRadius: 16, padding: 14, marginBottom: 10 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--green)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 6, letterSpacing: ".04em", marginBottom: 12 }}>🎉 YOU PASSED</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, border: "1px solid #BBF7D0" }}>{p.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--g900)" }}>{p.name} certificate ready</div>
                          <div style={{ fontSize: 11, color: "var(--green-dark)", fontWeight: 600, marginTop: 2 }}>Score {p.score} · {p.date} · {extraNote}</div>
                        </div>
                      </div>
                      <button onClick={onClick} style={{ background: actionBg, color: "#fff", width: "100%", border: "none", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>{actionLabel}</button>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ padding: "16px 20px 4px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--g900)", marginBottom: 4 }}>Recommended for your profile</div>
                  <div style={{ fontSize: 12, color: "var(--g500)" }}>Based on your job preferences</div>
                </div>
                <button onClick={() => go("browse")} style={{ background: "transparent", border: "none", color: "var(--brand)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: "4px 0", whiteSpace: "nowrap", flexShrink: 0 }}>See all →</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SKILLS.rec.map((s) => <SkillCard key={s.name} s={s} user={user} onClick={() => { pickSkill(s.name, s.icon); go("detail"); }} />)}
              </div>
            </div>

            <div style={{ padding: "16px 20px 0" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--g400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>How it works</div>
              <div style={{ display: "flex", gap: 6 }}>
                <Step icon="📝" label="Take free test" sub="10 mins, unlimited retakes" />
                <ArrowSep />
                <Step icon="✅" label="Score 70%+" sub="Pass to earn certificate" />
                <ArrowSep />
                <Step icon="🏅" label="Get verified badge" sub="Get shortlisted faster" subColor="var(--green-dark)" />
              </div>
            </div>

            <div style={{ padding: "20px 20px 4px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--g900)", marginBottom: 4 }}>Why get verified?</div>
              <div style={{ fontSize: 12, color: "var(--g500)", marginBottom: 12 }}>This is how recruiters see verified candidates</div>
              <div className="card" style={{ padding: 14, background: "linear-gradient(180deg,#fff,var(--g50))" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--g400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>🔍 Recruiter shortlist view</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "var(--green-50)", border: "1.5px solid var(--green)", borderRadius: 10, marginBottom: 8, position: "relative" }}>
                  <div style={{ position: "absolute", top: -7, right: 8, background: "var(--green)", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, letterSpacing: ".04em" }}>TOP MATCH</div>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>👨</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--g900)" }}>Rahul Kumar</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                      {["Tally", "MS Excel", "GST"].map((s) => (
                        <span key={s} style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", background: "var(--green)", color: "#fff", borderRadius: 4 }}>✓ {s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "#fff", border: "1px solid var(--g200)", borderRadius: 10, opacity: 0.75 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--g100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>👩</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--g700)" }}>Priya Sharma</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                      {["Tally", "MS Excel", "GST"].map((s) => (
                        <span key={s} style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", background: "var(--g100)", color: "var(--g500)", borderRadius: 4 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--g600)", marginTop: 10, textAlign: "center", lineHeight: 1.4 }}>
                  Anyone can <em>claim</em> a skill. <strong style={{ color: "var(--g900)" }}>Verified candidates get shortlisted first.</strong>
                </div>
              </div>
            </div>

            <div style={{ padding: "16px 20px 4px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--g900)", marginBottom: 4 }}>Popular across all jobs</div>
                  <div style={{ fontSize: 12, color: "var(--g500)" }}>Skills every employer looks for</div>
                </div>
                <button onClick={() => go("browse")} style={{ background: "transparent", border: "none", color: "var(--brand)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: "4px 0", whiteSpace: "nowrap", flexShrink: 0 }}>See all →</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SKILLS.gen.map((s) => <SkillCard key={s.name} s={s} user={user} onClick={() => { pickSkill(s.name, s.icon); go("detail"); }} />)}
              </div>
            </div>

            {/* Pricing / Premium status — moved below tests */}
            <div style={{ padding: "20px 20px 0" }}>
              {user === "free" ? (
                <>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "var(--g400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>How to unlock</div>
                  <div className="premium-card" style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, position: "relative", zIndex: 1 }}>
                      <span style={{ fontSize: 20 }}>💎</span>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--purple-dark)" }}>WorkIndia Premium — Rs 199/month</div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--g600)", lineHeight: 1.5, marginBottom: 6, position: "relative", zIndex: 1 }}>
                      Get <strong>1 free certificate every month</strong> + top ranking + WhatsApp job alerts
                    </div>
                    <div style={{ fontSize: 11, color: "var(--purple)", fontWeight: 700, fontStyle: "italic", marginBottom: 10, position: "relative", zIndex: 1 }}>
                      Premium gets you more calls. Verified skills win the interview.
                    </div>
                    <button className="btn btn-purple" style={{ minHeight: 44, fontSize: 14, padding: 12 }}>Become a Premium Member →</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#fff", border: "1px solid var(--g200)", borderRadius: 14 }}>
                    <span style={{ fontSize: 18 }}>🏷️</span>
                    <div style={{ fontSize: 13, color: "var(--g700)" }}>Or unlock certifications individually for <strong>Rs 99</strong> each</div>
                  </div>
                </>
              ) : (
                <div className="premium-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, position: "relative", zIndex: 1 }}>
                    <span className="tag" style={{ background: "var(--purple)", color: "#fff", fontSize: 11 }}>💎 Premium Member</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--purple-dark)", position: "relative", zIndex: 1 }}>
                    {user === "p2" ? "1 free certificate this month" : "Free credit used this month"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--g500)", marginTop: 2, position: "relative", zIndex: 1 }}>
                    {user === "p2" ? "Unlock instantly — no payment needed" : "Resets on 1st · Extras at Rs 49"}
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: "16px 20px" }}>
              <button className="btn btn-ghost" onClick={() => go("browse")}>🔍 Browse all certifications</button>
            </div>

            <div style={{ padding: "0 0 8px" }}>
              <div style={{ padding: "0 20px", fontSize: 13, fontWeight: 800, color: "var(--g900)", marginBottom: 10 }}>💬 What candidates say</div>
              <div style={{ overflow: "hidden" }}>
                <div className="reviews-track" style={{ paddingLeft: 20 }}>
                  {[...REVIEWS, ...REVIEWS].map((r, i) => (
                    <div key={i} className="review-card">
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>👤</div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--g900)" }}>{r.name} <span style={{ color: "var(--g400)", fontWeight: 500 }}>· {r.loc}</span></div>
                          <div style={{ fontSize: 10, color: "var(--green-dark)", fontWeight: 700, marginTop: 1 }}>✓ {r.role}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--g700)", lineHeight: 1.5, marginBottom: 8 }}>&quot;{r.text}&quot;</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 7px", background: "var(--green-light)", color: "var(--green-dark)", borderRadius: 6 }}>💰 {r.sal}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 7px", background: "var(--brand-light)", color: "var(--brand)", borderRadius: 6 }}>✓ {r.skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: "8px 20px 24px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--g400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10, textAlign: "center" }}>Certificates trusted by employers on WorkIndia</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                {["Swiggy", "Flipkart", "BigBasket", "Zepto", "Urban Company"].map((c) => (
                  <div key={c} style={{ padding: "7px 12px", border: "1px solid var(--g200)", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "var(--g600)", background: "#fff" }}>{c}</div>
                ))}
                <div style={{ padding: "7px 12px", border: "1px solid var(--g200)", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "var(--brand)", background: "var(--brand-light)" }}>+ all hiring companies</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BROWSE ALL ===== */}
        <div className={screenClass("browse")}>
          <BrowseHeader onBack={() => go("landing")} />
          <div style={{ flex: 1, overflowY: "auto", background: "var(--g50)" }}>
            <BrowseTopBar query={browseQuery} setQuery={setBrowseQuery} filter={browseFilter} setFilter={setBrowseFilter} />

            {/* Result-count line — only show when filtering */}
            {(q || browseFilter !== "All") && (
              <div style={{ padding: "10px 20px 0", fontSize: 12, color: "var(--g500)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  {totalMatches === 0 ? "No matches" : <><strong style={{ color: "var(--g900)" }}>{totalMatches}</strong> {totalMatches === 1 ? "result" : "results"}</>}
                  {q && <> for &quot;<span style={{ color: "var(--g900)" }}>{browseQuery}</span>&quot;</>}
                  {browseFilter !== "All" && <> in <span style={{ color: "var(--g900)" }}>{browseFilter}</span></>}
                </span>
                {(q || browseFilter !== "All") && (
                  <button onClick={() => { setBrowseQuery(""); setBrowseFilter("All"); }} style={{ background: "transparent", border: "none", color: "var(--brand)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>Clear</button>
                )}
              </div>
            )}

            <div style={{ padding: "12px 20px 24px" }}>
              {filteredClusters.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 20px", background: "#fff", border: "1px solid var(--g200)", borderRadius: 16 }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--g900)", marginBottom: 4 }}>No certifications found</div>
                  <div style={{ fontSize: 12, color: "var(--g500)", marginBottom: 16 }}>Try a different search or category</div>
                  <button onClick={() => { setBrowseQuery(""); setBrowseFilter("All"); }} style={{ background: "var(--brand)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Show all certifications</button>
                </div>
              ) : (
                filteredClusters.map((cluster) => (
                  <div key={cluster.title} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", border: "1px solid var(--g200)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{cluster.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--g900)" }}>{cluster.title}</div>
                        <div style={{ fontSize: 11, color: "var(--g500)", marginTop: 1 }}>{cluster.subtitle}</div>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--g400)", padding: "3px 8px", background: "#fff", border: "1px solid var(--g200)", borderRadius: 6, flexShrink: 0 }}>{cluster.skills.length}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {cluster.skills.map((s) => <SkillCard key={s.name} s={s} user={user} onClick={() => { pickSkill(s.name, s.icon); go("detail"); }} />)}
                    </div>
                  </div>
                ))
              )}

              <div style={{ marginTop: 24, padding: 16, background: "#fff", border: "1px dashed var(--g300)", borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--g700)", marginBottom: 4 }}>Don&apos;t see your skill?</div>
                <div style={{ fontSize: 12, color: "var(--g500)", marginBottom: 10 }}>New certifications are added every month</div>
                <button style={{ background: "transparent", border: "none", color: "var(--brand)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Request a certification →</button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DETAIL ===== */}
        <div className={screenClass("detail")}>
          <StepHeader step={1} onBack={() => go("landing")} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ textAlign: "center", padding: "24px 20px 16px" }}>
              <div style={{ fontSize: 56, marginBottom: 6 }}>{skill.icon}</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--g900)", margin: 0 }}>{skill.name}</h1>
              {activeSkill?.desc && (
                <p style={{ fontSize: 13, color: "var(--g500)", margin: "6px 0 0", lineHeight: 1.4 }}>{activeSkill.desc}</p>
              )}
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                <span className="tag" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>📝 {activeSkill?.qPerAttempt ?? 15} Qs</span>
                <span className="tag" style={{ background: "var(--amber-light)", color: "var(--amber-dark)" }}>⏱ {Math.round((activeSkill?.timeSec ?? 600) / 60)} min</span>
                <span className="tag" style={{ background: "var(--green-light)", color: "var(--green-dark)" }}>✅ {activeSkill?.passPct ?? 70}% pass</span>
              </div>
            </div>
            <div style={{ padding: "0 20px 14px" }}>
              <div style={{ background: "var(--green-light)", border: "1px solid #BBF7D0", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🆓</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green-dark)" }}>Free to take, unlimited retakes</div>
                  <div style={{ fontSize: 11, color: "var(--g500)", marginTop: 2 }}>You only pay after passing — for the certificate</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 20px 14px" }}>
              <div className="card" style={{ borderLeft: "4px solid var(--green)" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--g900)", marginBottom: 12 }}>What you get on passing</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 13, color: "var(--g700)", lineHeight: 1.5 }}>
                  <BenefitRow emoji="🏅" text={<>Verified <strong>{skill.name}</strong> badge — visible on top of your profile</>} />
                  <BenefitRow emoji="⭐" text={<>Stand out from candidates who only <em>claim</em> the skill</>} />
                  <BenefitRow emoji="📄" text="Downloadable PDF certificate to share with recruiters" />
                  <BenefitRow emoji="📈" text="Higher chance of shortlisting for matched roles" />
                </div>
              </div>
            </div>
            <div style={{ padding: "0 20px 14px" }}>
              <div className="card" style={{ border: "1px dashed var(--brand-50)", background: "var(--brand-light)", cursor: "pointer" }} onClick={() => setSampleOpen(!sampleOpen)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "var(--brand)" }}>👀 See a sample question</div>
                    <div style={{ fontSize: 11, color: "var(--g500)", marginTop: 2 }}>Check the difficulty before you start</div>
                  </div>
                  <span style={{ fontSize: 18, color: "var(--brand)", transform: sampleOpen ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform .2s" }}>›</span>
                </div>
                {sampleOpen && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px dashed var(--brand-50)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--g900)", marginBottom: 10 }}>{activeQuestions[0]?.q}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {activeQuestions[0]?.o.map((o, i) => (
                        <div key={i} style={{ padding: "9px 12px", border: "1.5px solid var(--g200)", borderRadius: 10, background: "#fff", fontSize: 12, color: "var(--g700)", display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--g100)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: "var(--g500)" }}>{"ABCD"[i]}</span>{o}
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--g500)", marginTop: 10, fontStyle: "italic" }}>This is an example — actual test has 15 questions of similar level</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: "0 20px 14px" }}>
              <div className="card">
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--g900)", marginBottom: 10 }}>📋 Test rules</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--g700)" }}>
                  <div>⏱ {activeSkill?.perQSec ?? 40} seconds per question</div>
                  <div>🎯 Pass mark: {activeSkill?.passCorrect ?? 11}/{activeSkill?.qPerAttempt ?? 15} correct ({activeSkill?.passPct ?? 70}%)</div>
                  <div>🎲 {activeSkill?.qPerAttempt ?? 15} questions randomly served from a bank of {activeSkill?.totalBank ?? 40}</div>
                  <div>🚫 Can&apos;t go back to previous questions</div>
                  <div>🔄 Unlimited retakes — no penalty</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 20px 14px" }}>
              {user === "free" ? (
                <>
                  <div className="card" style={{ background: "var(--purple-light)", border: "1px solid #DDD6FE", marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--purple-dark)", marginBottom: 4 }}>💎 Free with Premium</div>
                    <div style={{ fontSize: 12, color: "var(--g600)", lineHeight: 1.5 }}>Premium members (Rs 199/mo) get <strong>1 certificate free every month</strong></div>
                  </div>
                  <div className="card" style={{ background: "var(--g50)", borderColor: "var(--g200)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🏷️</span>
                      <div style={{ fontSize: 13, color: "var(--g600)" }}>Or pay <strong>Rs 99</strong> one-time after you pass</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="premium-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, position: "relative", zIndex: 1 }}>
                    <span className="tag" style={{ background: "var(--purple)", color: "#fff" }}>💎 Premium</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--purple-dark)", position: "relative", zIndex: 1 }}>
                    {user === "p2" ? "Use your free credit this month to unlock after passing" : "Discounted unlock at Rs 49 after passing"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--g500)", marginTop: 2, position: "relative", zIndex: 1 }}>
                    {user === "p2" ? "One tap unlock, no payment" : "Your free credits reset on 1 June"}
                  </div>
                </div>
              )}
            </div>
            <div style={{ height: 90 }} />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 20px 14px", background: "#fff", borderTop: "1px solid var(--g100)", boxShadow: "0 -4px 12px rgba(0,0,0,.05)", zIndex: 5 }}>
            <button className="btn btn-brand" onClick={() => go("quiz")} style={{ fontSize: 16 }}>▶️ Start Free Test</button>
          </div>
        </div>

        {/* ===== QUIZ ===== */}
        <div className={screenClass("quiz")} style={{ background: "#fff" }}>
          <StepHeader step={2} onBack={() => setQuitOpen(true)} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--g900)" }}>Question {qIdx + 1} of {activeSkill?.qPerAttempt ?? 15}</div>
                <div style={{ fontSize: 11, color: "var(--g400)", marginTop: 2 }}>{skill.name} Test</div>
              </div>
              <div className={`timer-circle ${timer <= 10 ? "timer-warn" : "timer-ok"}`}>{timer}</div>
            </div>
            <div className="prog-track" style={{ marginBottom: 24 }}>
              <div className="prog-fill" style={{ width: `${((qIdx + 1) / (activeSkill?.qPerAttempt ?? 15)) * 100}%` }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.5, color: "var(--g900)", marginBottom: 24 }}>{activeQuestions[qIdx]?.q}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activeQuestions[qIdx]?.o.map((o, i) => (
                  <div key={i} className={`opt ${sel === i ? "picked" : ""}`} onClick={() => pick(i)}>
                    <div className="oL">{"ABCD"[i]}</div>
                    <span style={{ fontWeight: 500 }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="btn btn-ghost" style={{ width: "auto", padding: "16px 20px" }} onClick={() => setQuitOpen(true)}>✕</button>
              <button className="btn btn-brand" disabled={sel === -1} onClick={nextQ} style={{ flex: 1 }}>Next →</button>
            </div>
          </div>
        </div>

        {/* ===== RESULT PASS ===== */}
        <div className={screenClass("resultPass")}>
          <StepHeader step={3} variant="pass" onBack={() => go("landing")} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ textAlign: "center", padding: "24px 20px 16px", background: "linear-gradient(180deg,var(--green-light) 0%,#fff 100%)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 8, left: "12%", fontSize: 18, animation: "confettiDrop 2s ease-out infinite" }}>🎊</div>
              <div style={{ position: "absolute", top: 14, right: "18%", fontSize: 14, animation: "confettiDrop 2.3s .4s ease-out infinite" }}>✨</div>
              <div style={{ position: "absolute", top: 4, left: "42%", fontSize: 16, animation: "confettiDrop 1.8s .8s ease-out infinite" }}>🎉</div>
              <div className="anim-pop" style={{ fontSize: 60, marginBottom: 4 }}>🏆</div>
              <h2 className="anim-up" style={{ fontSize: 28, fontWeight: 900, color: "var(--green-dark)", margin: 0 }}>You passed!</h2>
              <div className="anim-d1" style={{ marginTop: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "var(--green)" }}>13</span>
                <span style={{ fontSize: 16, color: "var(--g500)", fontWeight: 600 }}> / 15</span>
              </div>
              <p className="anim-d2" style={{ fontSize: 14, color: "var(--g500)", marginTop: 6 }}>
                Your <strong style={{ color: "var(--g900)" }}>{skill.name}</strong> certificate is ready!
              </p>
            </div>
            <div style={{ padding: "0 20px 24px" }}>
              <div className="cert anim-d2" style={{ marginBottom: 20 }}>
                <Certificate skill={skill.name} />
                <div className="cert-lock" style={{ cursor: "pointer" }} onClick={() => setUnlockOpen(true)}>
                  <div style={{ textAlign: "center", background: "rgba(255,255,255,.95)", padding: "16px 24px", borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,.1)" }}>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>🔒</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--g600)" }}>Tap to unlock</div>
                  </div>
                </div>
              </div>
              {user === "free" && (
                <>
                  <div style={{ background: "var(--brand-light)", border: "1px solid var(--brand-50)", borderRadius: 12, padding: "10px 12px", marginBottom: 12, display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>🎯</span>
                    <div style={{ fontSize: 12, color: "var(--g700)", lineHeight: 1.4 }}>
                      Your verified badge shows on top of your profile. Recruiters search for verified candidates.
                    </div>
                  </div>
                  <button className="btn btn-brand" onClick={() => setUnlockOpen(true)} style={{ fontSize: 16, marginBottom: 10 }}>🔓 Unlock Certificate</button>
                  <div style={{ textAlign: "center", fontSize: 12, color: "var(--g500)" }}>Buy Premium membership · Or Rs 99 one-time</div>
                </>
              )}
              {user === "p2" && (
                <>
                  <button className="btn btn-purple" onClick={() => go("success")} style={{ marginBottom: 8, fontSize: 16 }}>💎 Unlock with Premium credit</button>
                  <div style={{ textAlign: "center", fontSize: 12, color: "var(--g500)", marginTop: 8 }}>One tap · No payment · Instant unlock</div>
                </>
              )}
              {user === "p0" && (
                <>
                  <button className="btn btn-brand" onClick={() => go("success")} style={{ marginBottom: 8, fontSize: 15 }}>🔓 Unlock — Rs 49 (Premium discount)</button>
                  <div style={{ textAlign: "center", fontSize: 12, color: "var(--g500)", marginTop: 8 }}>Your free credits reset on 1 June</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ===== RESULT FAIL ===== */}
        <div className={screenClass("resultFail")}>
          <StepHeader step={3} variant="fail" onBack={() => go("landing")} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ textAlign: "center", padding: "28px 20px 20px", background: "linear-gradient(180deg,var(--amber-light) 0%,#fff 100%)" }}>
              <div className="anim-pop" style={{ fontSize: 60, marginBottom: 4 }}>💪</div>
              <h2 className="anim-up" style={{ fontSize: 24, fontWeight: 900, color: "var(--g900)", margin: 0 }}>Almost there!</h2>
              <div className="anim-d1" style={{ marginTop: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "var(--amber)" }}>9</span>
                <span style={{ fontSize: 16, color: "var(--g500)", fontWeight: 600 }}> / 15</span>
              </div>
              <p className="anim-d2" style={{ fontSize: 14, color: "var(--g500)", marginTop: 6 }}>
                Need <strong style={{ color: "var(--g900)" }}>11</strong> to pass. You&apos;re close!
              </p>
            </div>
            <div style={{ padding: "0 20px 24px" }}>
              <div className="card anim-d2" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "8px 0" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: "var(--green)" }}>9</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--green)" }}>Correct</span>
                  </div>
                  <div style={{ width: 1, background: "var(--g200)" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: "var(--red)" }}>6</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--red)" }}>Wrong</span>
                  </div>
                </div>
              </div>
              <div className="card anim-d3" style={{ background: "var(--brand-light)", borderColor: "var(--brand-50)", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>💡</span>
                  <div style={{ fontSize: 13, color: "var(--g700)", lineHeight: 1.5 }}>
                    <strong>Tip:</strong> Retake now — no waiting, no penalty. Most candidates pass on their 2nd try!
                  </div>
                </div>
              </div>
              <button className="btn btn-brand anim-d3" onClick={() => { resetQuiz(); go("quiz"); }} style={{ marginBottom: 10 }}>🔄 Retake Test — Free</button>
              <button className="btn btn-ghost anim-d4" onClick={() => go("landing")}>← Browse other tests</button>
            </div>
          </div>
        </div>

        {/* ===== SUCCESS ===== */}
        <div className={screenClass("success")}>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px", position: "absolute", top: 0, right: 0, zIndex: 5 }}>
            <button onClick={() => go("landing")} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.85)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ textAlign: "center", padding: "28px 20px 20px", background: "linear-gradient(180deg,var(--green-light) 0%,#fff 100%)" }}>
              <div className="anim-pop" style={{ fontSize: 60, marginBottom: 4 }}>✅</div>
              <h2 className="anim-up" style={{ fontSize: 22, fontWeight: 900, color: "var(--green-dark)", margin: 0 }}>{skill.name} verified!</h2>
              <p className="anim-d1" style={{ fontSize: 13, color: "var(--g500)", marginTop: 6 }}>Verified badge is now live on your profile</p>
            </div>
            <div style={{ padding: "0 20px 24px" }}>
              <div className="cert anim-d1" style={{ marginBottom: 20 }}>
                <Certificate skill={skill.name} />
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #E8D5A0" }}>
                  <div style={{ fontSize: 9, color: "#A68B3E", fontWeight: 600 }}>Verified by WorkIndia · ID: WI-2026-48291</div>
                </div>
              </div>
              <div className="anim-d2" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                <ActionBtn bg="var(--brand-light)" color="var(--brand)" emoji="📄" label="Download" />
                <ActionBtn bg="var(--green-light)" color="var(--green-dark)" emoji="💬" label="WhatsApp" />
                <ActionBtn bg="var(--g100)" color="var(--g700)" emoji="👤" label="Profile" />
              </div>
              <div className="anim-d3">
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--g900)", marginBottom: 12 }}>What&apos;s next?</div>
                <button className="btn btn-brand" onClick={() => go("landing")} style={{ marginBottom: 10 }}>🎯 Verify another skill</button>
                <button className="btn btn-ghost">💼 See matching jobs</button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== UNLOCK SHEET ===== */}
        <div className={`sheet-bg ${unlockOpen ? "open" : ""}`} onClick={() => setUnlockOpen(false)} />
        <div className={`sheet ${unlockOpen ? "open" : ""}`}>
          <div className="sheet-handle" />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 12 }}>
            <div style={{ flex: 1, textAlign: "center", paddingLeft: 32 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--g900)" }}>Unlock your certificate</div>
              <div style={{ fontSize: 12, color: "var(--g500)", marginTop: 4 }}>Choose how you&apos;d like to unlock</div>
            </div>
            <button onClick={() => setUnlockOpen(false)} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "var(--g100)", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--g600)" }}>✕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="sheet-opt primary" onClick={() => { setUnlockOpen(false); go("success"); }}>
              <div className="sheet-opt-badge">⭐ BEST VALUE</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>💎</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--purple-dark)" }}>Become Premium — Rs 199/mo</div>
                  <div style={{ fontSize: 11, color: "var(--purple)", fontWeight: 700, fontStyle: "italic", marginTop: 2 }}>
                    Premium gets you more calls. Verified skills win the interview.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "var(--g700)", marginTop: 10, lineHeight: 1.4 }}>
                    <BulletRow><>This certificate <strong>free</strong></></BulletRow>
                    <BulletRow>1 certificate free every month</BulletRow>
                    <BulletRow>Top ranking in recruiter search</BulletRow>
                    <BulletRow>WhatsApp &amp; email job alerts</BulletRow>
                    <BulletRow>Higher daily apply limit</BulletRow>
                  </div>
                  <button className="btn shimmer-btn" style={{ minHeight: 46, fontSize: 14, marginTop: 14, color: "#fff" }}>💎 Become Premium &amp; Unlock Free</button>
                </div>
              </div>
            </div>
            <div className="sheet-opt" onClick={() => { setUnlockOpen(false); go("success"); }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>🏷️</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--g800)" }}>Pay Rs 99 — One-time</div>
                  <div style={{ fontSize: 12, color: "var(--g500)", marginTop: 2 }}>Just this certificate, no membership</div>
                </div>
                <div style={{ fontSize: 20, color: "var(--g400)", flexShrink: 0 }}>›</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--g400)", marginTop: 14 }}>🔒 Secure payment · Instant download · Share anywhere</div>
        </div>

        {/* ===== QUIT MODAL ===== */}
        {quitOpen && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 320, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>⚠️</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--g900)", marginBottom: 6 }}>Quit test?</h3>
              <p style={{ fontSize: 13, color: "var(--g500)", marginBottom: 18 }}>Your progress will be lost. You can retake anytime for free.</p>
              <button className="btn btn-brand" onClick={() => setQuitOpen(false)} style={{ marginBottom: 8 }}>Continue Test</button>
              <button className="btn btn-ghost" onClick={() => { setQuitOpen(false); go("landing"); }} style={{ color: "var(--red)", borderColor: "var(--g200)" }}>Quit</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ===== Sub-components =====

function BrowseHeader({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", padding: "14px 16px 18px", color: "#fff", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.18)", color: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
        <span style={{ fontSize: 15, fontWeight: 800 }}>Browse Certifications</span>
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)", paddingLeft: 42 }}>Pick a skill to verify · {ALL_SKILLS.length} certifications · 8 categories</div>
    </div>
  );
}

function BrowseTopBar({ query, setQuery, filter, setFilter }: { query: string; setQuery: (q: string) => void; filter: string; setFilter: (f: string) => void }) {
  return (
    <div style={{ position: "sticky", top: 0, background: "var(--g50)", padding: "12px 20px 8px", zIndex: 3, borderBottom: "1px solid var(--g100)" }}>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "var(--g400)" }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by skill name..."
          style={{ width: "100%", padding: "11px 38px 11px 38px", border: "1px solid var(--g200)", borderRadius: 12, fontSize: 13, background: "#fff", outline: "none", fontFamily: "inherit", color: "var(--g900)" }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, height: 24, borderRadius: "50%", border: "none", background: "var(--g100)", cursor: "pointer", fontSize: 11, color: "var(--g600)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>✕</button>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
        {["All", "Accounts", "Computer", "Sales", "Tech & IT", "Design", "Marketing", "HR", "Operations"].map((chip) => {
          const isActive = filter === chip;
          return (
            <button
              key={chip}
              onClick={() => setFilter(chip)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                border: isActive ? "1px solid var(--brand)" : "1px solid var(--g200)",
                background: isActive ? "var(--brand)" : "#fff",
                color: isActive ? "#fff" : "var(--g600)",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                fontFamily: "inherit",
                transition: "all .15s",
              }}
            >{chip}</button>
          );
        })}
      </div>
    </div>
  );
}

function StepHeader({ step, variant, onBack }: { step: 1 | 2 | 3; variant?: "pass" | "fail"; onBack: () => void }) {
  const d2 = step >= 2, d3 = step >= 3;
  const c1 = step === 1, c2 = step === 2, c3 = step === 3;
  return (
    <div style={{ position: "relative", padding: "12px 16px 14px", background: "#fff", borderBottom: "1px solid var(--g100)" }}>
      <button onClick={onBack} style={{ position: "absolute", left: 12, top: 10, width: 32, height: 32, borderRadius: "50%", border: "none", background: "var(--g100)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>←</button>
      <div style={{ display: "flex", alignItems: "center", maxWidth: 280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div className={`sD ${c1 ? "cur" : "done"}`}>{c1 ? "1" : "✓"}</div>
          <div className={`sT ${c1 ? "cur" : "done"}`}>Details</div>
        </div>
        <div className={`sL ${d2 ? "done" : ""}`} />
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div className={`sD ${c2 ? "cur" : d2 ? "done" : ""}`}>{c2 ? "2" : d2 ? "✓" : "2"}</div>
          <div className={`sT ${c2 ? "cur" : d2 ? "done" : ""}`}>Test</div>
        </div>
        <div className={`sL ${d3 ? "done" : ""}`} />
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            className="sD"
            style={
              variant === "pass" ? { background: "var(--green)", borderColor: "var(--green)", color: "#fff" }
              : variant === "fail" ? { background: "var(--amber)", borderColor: "var(--amber)", color: "#fff" }
              : c3 ? { background: "var(--brand)", borderColor: "var(--brand)", color: "#fff" } : {}
            }
          >3</div>
          <div className="sT" style={{ color: variant === "pass" ? "var(--green)" : variant === "fail" ? "var(--amber-dark)" : c3 ? "var(--brand)" : "var(--g500)" }}>Result</div>
        </div>
      </div>
    </div>
  );
}

function Step({ icon, label, sub, subColor }: { icon: string; label: string; sub: string; subColor?: string }) {
  return (
    <div style={{ flex: 1, textAlign: "center", padding: "12px 6px", background: "#fff", borderRadius: 12, border: "1px solid var(--g200)" }}>
      <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--g900)" }}>{label}</div>
      <div style={{ fontSize: 10, color: subColor || "var(--g400)", marginTop: 2, fontWeight: subColor ? 600 : 400 }}>{sub}</div>
    </div>
  );
}

function ArrowSep() {
  return <div style={{ display: "flex", alignItems: "center", color: "var(--g300)", fontSize: 16 }}>→</div>;
}

function BenefitRow({ emoji, text }: { emoji: string; text: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ flexShrink: 0, fontSize: 15, lineHeight: 1.3 }}>{emoji}</span>
      <span>{text}</span>
    </div>
  );
}

function BulletRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <span style={{ color: "var(--green)", fontWeight: 800, flexShrink: 0 }}>✓</span>
      <span>{children}</span>
    </div>
  );
}

function SkillCard({ s, user, onClick }: { s: Skill; user: UserType; onClick: () => void }) {
  const isFree = user === "free";
  return (
    <div className="skill-card" onClick={onClick}>
      <div className="skill-icon" style={{ background: s.bg }}>{s.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--g900)" }}>{s.name}</div>
        <div style={{ fontSize: 12, color: "var(--g500)", marginTop: 2 }}>{s.qPerAttempt} Qs · {Math.round(s.timeSec/60)} min · {s.n} certified</div>
        <div style={{ marginTop: 6 }}>
          <span className="tag" style={{ background: isFree ? "var(--green-light)" : "var(--purple-light)", color: isFree ? "var(--green-dark)" : "var(--purple)" }}>
            {isFree ? "🆓 Free to attempt" : "💎 Free with Premium"}
          </span>
        </div>
      </div>
      <div style={{ color: "var(--brand)", fontSize: 20, flexShrink: 0 }}>›</div>
    </div>
  );
}

function Certificate({ skill }: { skill: string }) {
  return (
    <>
      <div className="cert-seal">🏅</div>
      <div style={{ fontSize: 9, letterSpacing: "2px", color: "#A68B3E", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Certificate of Verification</div>
      <div style={{ fontSize: 12, color: "var(--g400)" }}>This certifies that</div>
      <div style={{ fontSize: 20, fontWeight: 900, color: "var(--g900)", margin: "4px 0" }}>Rahul Kumar</div>
      <div style={{ fontSize: 12, color: "var(--g400)" }}>has demonstrated proficiency in</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "var(--brand)", margin: "4px 0" }}>{skill}</div>
      <div style={{ fontSize: 10, color: "#B8A060" }}>Score: 13/15 · May 2026 · WorkIndia</div>
    </>
  );
}

function ActionBtn({ bg, color, emoji, label }: { bg: string; color: string; emoji: string; label: string }) {
  return (
    <button style={{ flex: 1, background: bg, color, border: "none", borderRadius: 14, padding: "14px 6px", cursor: "pointer", fontSize: 11, fontWeight: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>{label}
    </button>
  );
}
