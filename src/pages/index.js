import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { MessageSquare, Globe, ChefHat, Heart } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 p-6 text-base-content">
      <div>
        <p className="text-sm opacity-75">© 2024 ChasAi Platform. All rights reserved</p>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-base-100`}>
      <main className="container mx-auto flex-grow px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="hero py-12 sm:py-16 lg:py-20">
          <div className="hero-content text-center">
            <div>
              <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent sm:mb-6 sm:text-5xl lg:text-6xl">
                Welcome to ChasAI Platform
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-gray-300">
                Explore our suite of AI-powered tools designed to enhance your daily life
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <Link
            href="/ChasGPT"
            className="card bg-base-200 transition-all duration-300 hover:bg-base-300 hover:shadow-lg"
          >
            <div className="card-body">
              <MessageSquare className="mb-4 h-10 w-10 text-primary" />
              <h2 className="card-title">ChasGPT</h2>
              <p className="text-sm opacity-75">Your intelligent AI assistant for any conversation</p>
            </div>
          </Link>

          <Link
            href="/TranslatorAi"
            className="card bg-base-200 transition-all duration-300 hover:bg-base-300 hover:shadow-lg"
          >
            <div className="card-body">
              <Globe className="mb-4 h-10 w-10 text-primary" />
              <h2 className="card-title">Translator AI</h2>
              <p className="text-sm opacity-75">Break language barriers effortlessly</p>
            </div>
          </Link>

          <Link
            href="/CulinaryAI"
            className="card bg-base-200 transition-all duration-300 hover:bg-base-300 hover:shadow-lg"
          >
            <div className="card-body">
              <ChefHat className="mb-4 h-10 w-10 text-primary" />
              <h2 className="card-title">Culinary AI</h2>
              <p className="text-sm opacity-75">Your personal AI chef and recipe creator</p>
            </div>
          </Link>

          <Link
            href="/AiHealthCoach"
            className="card bg-base-200 transition-all duration-300 hover:bg-base-300 hover:shadow-lg"
          >
            <div className="card-body">
              <Heart className="mb-4 h-10 w-10 text-primary" />
              <h2 className="card-title">Health Coach</h2>
              <p className="text-sm opacity-75">AI-powered health and wellness guidance</p>
            </div>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
