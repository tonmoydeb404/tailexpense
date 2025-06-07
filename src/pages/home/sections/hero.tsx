import {
  Banknote,
  Coins,
  CreditCard,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { paths } from "~/router/config";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-950">
      {/* Animated Money Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Dollar Signs */}
        <DollarSign
          className="absolute top-20 left-10 w-8 h-8 text-green-400 dark:text-green-300 opacity-60 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <DollarSign
          className="absolute top-32 right-20 w-6 h-6 text-green-500 dark:text-green-400 opacity-40 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <DollarSign
          className="absolute bottom-40 left-1/4 w-10 h-10 text-green-600 dark:text-green-500 opacity-30 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        />

        {/* Floating Coins */}
        <Coins
          className="absolute top-16 right-1/3 w-7 h-7 text-yellow-500 dark:text-yellow-400 opacity-50 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <Coins
          className="absolute bottom-32 right-16 w-9 h-9 text-yellow-600 dark:text-yellow-500 opacity-40 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        />
        <Coins
          className="absolute top-1/2 left-16 w-5 h-5 text-yellow-400 dark:text-yellow-300 opacity-60 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Floating Banknotes */}
        <Banknote className="absolute top-24 left-1/3 w-8 h-8 text-green-500 dark:text-green-400 opacity-40 floating-animation" />
        <Banknote
          className="absolute bottom-20 right-1/4 w-6 h-6 text-green-400 dark:text-green-300 opacity-50 floating-animation"
          style={{ animationDelay: "3s" }}
        />

        {/* Credit Cards */}
        <CreditCard className="absolute top-40 right-12 w-7 h-7 text-blue-500 dark:text-blue-400 opacity-30 rotate-animation" />
        <CreditCard
          className="absolute bottom-48 left-20 w-5 h-5 text-blue-400 dark:text-blue-300 opacity-40 rotate-animation"
          style={{ animationDelay: "2s" }}
        />

        {/* Trending Up Icons */}
        <TrendingUp className="absolute top-28 left-1/2 w-6 h-6 text-emerald-500 dark:text-emerald-400 opacity-50 scale-animation" />
        <TrendingUp
          className="absolute bottom-36 right-1/3 w-8 h-8 text-emerald-600 dark:text-emerald-500 opacity-30 scale-animation"
          style={{ animationDelay: "1s" }}
        />

        {/* Wallet Icons */}
        <Wallet className="absolute top-36 right-1/4 w-7 h-7 text-purple-500 dark:text-purple-400 opacity-40 wiggle-animation" />
        <Wallet
          className="absolute bottom-24 left-1/3 w-5 h-5 text-purple-400 dark:text-purple-300 opacity-50 wiggle-animation"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Tailexpense
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl">
              Take control of your spending with our intuitive personal expense
              tracker. Monitor your expenses, set budgets, and gain insights
              into your spending habits to achieve your financial goals.
            </p>
          </div>

          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link to={paths.dashboard.root}>Get Started</Link>
            </Button>
            <Button variant="secondary" size="lg" className="border" asChild>
              <Link to={paths.github} target="_blank">
                Github
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
              <span>Track every expense</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span>Smart categorization</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span>Budget insights</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        .floating-animation {
          animation: floating 6s ease-in-out infinite;
        }
        
        .rotate-animation {
          animation: rotate 8s linear infinite;
        }
        
        .scale-animation {
          animation: scale 4s ease-in-out infinite;
        }
        
        .wiggle-animation {
          animation: wiggle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
