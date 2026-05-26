"use client";

import { FormEvent, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function LandingPage() {
  const [heroEmail, setHeroEmail] = useState("");
  const [betaEmail, setBetaEmail] = useState("");
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [betaSuccess, setBetaSuccess] = useState(false);
  const [heroError, setHeroError] = useState("");
  const [betaError, setBetaError] = useState("");
  const [heroLoading, setHeroLoading] = useState(false);
  const [betaLoading, setBetaLoading] = useState(false);

  async function saveEmail(email: string) {
    const trimmed = email.trim();
    if (!trimmed) {
      throw new Error("Please enter your email.");
    }

    const supabase = getSupabase();
    if (!supabase) {
      throw new Error("Signup is not configured yet. Please try again later.");
    }

    const { error } = await supabase.from("signups").insert({ email: trimmed });

    if (error) {
      throw new Error(error.message);
    }
  }

  async function onHeroSubmit(e: FormEvent) {
    e.preventDefault();
    setHeroError("");
    setHeroSuccess(false);
    setHeroLoading(true);

    try {
      await saveEmail(heroEmail);
      setHeroSuccess(true);
      setHeroEmail("");
    } catch (err) {
      setHeroError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setHeroLoading(false);
    }
  }

  async function onBetaSubmit(e: FormEvent) {
    e.preventDefault();
    setBetaError("");
    setBetaSuccess(false);
    setBetaLoading(true);

    try {
      await saveEmail(betaEmail);
      setBetaSuccess(true);
      setBetaEmail("");
    } catch (err) {
      setBetaError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBetaLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Peace of mind for families living apart
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Know your parent is okay.
              <span className="block text-green-600 mt-2">
                Without feeling intrusive.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A simple daily wellbeing check-in for elderly parents and carers.
              Designed for families separated by distance.
            </p>

            <form
              onSubmit={onHeroSubmit}
              className="flex flex-col sm:flex-row gap-4 mb-3"
            >
              <input
                type="email"
                required
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-5 py-4 border-2 border-gray-300 rounded-2xl w-full sm:w-80 text-lg"
              />
              <button
                type="submit"
                disabled={heroLoading}
                className="bg-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg disabled:opacity-60"
              >
                {heroLoading ? "Joining..." : "Join Early Access"}
              </button>
            </form>

            {heroSuccess && (
              <p className="text-lg font-semibold text-green-700 mb-3">
                You&apos;re on the list
              </p>
            )}
            {heroError && (
              <p className="text-red-600 mb-3">{heroError}</p>
            )}

            <p className="text-sm text-gray-500">
              Looking for 25 beta families to help shape the app.
            </p>
          </div>

          <div className="bg-gray-100 rounded-3xl p-8 shadow-2xl">
            <div className="bg-white rounded-3xl p-6 max-w-sm mx-auto shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mx-auto mb-4">
                  {String.fromCodePoint(0x1f474)}
                </div>
                <h3 className="text-2xl font-bold">Good Morning Jean</h3>
                <p className="text-gray-500 mt-2">Just checking in today.</p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full bg-green-500 text-white py-4 rounded-2xl text-xl font-semibold"
                >
                  {String.fromCodePoint(0x1f44d)} I&apos;m okay
                </button>

                <button
                  type="button"
                  className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl text-xl font-semibold"
                >
                  {String.fromCodePoint(0x26a0, 0xfe0f)} Need help
                </button>

                <button
                  type="button"
                  className="w-full bg-red-500 text-white py-4 rounded-2xl text-xl font-semibold"
                >
                  {String.fromCodePoint(0x1f4de)} Please call me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Caring from another city or country is stressful.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="text-5xl mb-4">{String.fromCodePoint(0x1f61f)}</div>
              <h3 className="text-2xl font-semibold mb-3">Constant Worry</h3>
              <p className="text-gray-600 leading-relaxed">
                Wondering if your parent is okay today can quietly drain your
                energy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="text-5xl mb-4">{String.fromCodePoint(0x1f4f5)}</div>
              <h3 className="text-2xl font-semibold mb-3">Missed Calls</h3>
              <p className="text-gray-600 leading-relaxed">
                Sometimes they simply forget their phone. Sometimes it feels
                more serious.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="text-5xl mb-4">{String.fromCodePoint(0x2708, 0xfe0f)}</div>
              <h3 className="text-2xl font-semibold mb-3">Distance Guilt</h3>
              <p className="text-gray-600 leading-relaxed">
                Living abroad or far away should not mean feeling disconnected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built to be simple for everyone.
            </h2>
            <p className="text-xl text-gray-600">
              No complicated apps. No tech stress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-3xl p-8">
              <div className="text-4xl mb-4">{String.fromCodePoint(0x2705)}</div>
              <h3 className="text-2xl font-bold mb-3">One Tap Daily Check-ins</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Your parent simply taps a button each day to let family know
                they are okay.
              </p>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <div className="text-4xl mb-4">{String.fromCodePoint(0x1f514)}</div>
              <h3 className="text-2xl font-bold mb-3">Smart Notifications</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                If a check-in is missed, family members are gently notified.
              </p>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <div className="text-4xl mb-4">{String.fromCodePoint(0x1f4f1)}</div>
              <h3 className="text-2xl font-bold mb-3">No App Store Needed</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Works directly from the phone home screen like a normal app.
              </p>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <div className="text-4xl mb-4">{String.fromCodePoint(0x1f91d)}</div>
              <h3 className="text-2xl font-bold mb-3">Respectful by Design</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Designed to support independence, not create feelings of
                surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            We are validating this idea with real families.
          </h2>

          <p className="text-xl text-gray-700 leading-relaxed mb-10">
            If you care for an elderly parent from a distance, we&apos;d love
            your feedback. Early testers will help shape the product and get
            lifetime discounted access.
          </p>

          <form
            onSubmit={onBetaSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-3"
          >
            <input
              type="email"
              required
              value={betaEmail}
              onChange={(e) => setBetaEmail(e.target.value)}
              placeholder="Your email address"
              className="px-5 py-4 border-2 border-gray-300 rounded-2xl w-full sm:w-96 text-lg"
            />
            <button
              type="submit"
              disabled={betaLoading}
              className="bg-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg disabled:opacity-60"
            >
              {betaLoading ? "Sending..." : "Request Beta Access"}
            </button>
          </form>

          {betaSuccess && (
            <p className="text-lg font-semibold text-green-700">
              You&apos;re on the list
            </p>
          )}
          {betaError && <p className="text-red-600 mt-3">{betaError}</p>}
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">PingOkay</h3>
            <p className="text-gray-500 mt-1">
              Helping families stay connected across distance.
            </p>
          </div>

          <div className="text-gray-500 text-sm">&copy; 2026 PingOkay</div>
        </div>
      </footer>
    </div>
  );
}
