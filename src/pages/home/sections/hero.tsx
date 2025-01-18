import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { paths } from "~/router/config";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <header className="w-full container min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-heading font-bold mb-10">
        Track Your Budgets Now
      </h1>
      <Button size={"lg"} asChild>
        <Link to={paths.dashboard.root}>Go To Dashboard</Link>
      </Button>
    </header>
  );
};

export default HeroSection;
