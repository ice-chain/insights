import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChartsDemo } from '@/components/features/ChartsDemo';

export function GetStarted() {
  return (
    <div className="flex mt-12">
      <div>
        <p className="text-6xl max-w-2xl">
          Enhanced insights for the Instagram
        </p>
        <p className="text-md max-w-xl mt-12">
          Manage all your instagram accounts from one place.
          Discover and grow faster with this intuitive tool, analyze your data and make smarter decisions.
        </p>
        <Button
          asChild
          variant="primary"
          className="mt-24 w-fit text-xl"
        >
          <Link
            className="inline-flex items-center"
            to="/sign-up"
          >
            Get started
          </Link>
        </Button>
      </div>
      <ChartsDemo />
    </div>
  );
}
