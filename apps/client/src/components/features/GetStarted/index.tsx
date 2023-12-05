import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function GetStarted() {
  return (
    <>
      <p className="text-6xl max-w-2xl mt-12">
        Enhanced insights for the Instagram
      </p>
      <p className="text-md max-w-xl mt-12">
        Manage all your instagram accounts from one place.
        Discover and grow faster with this intuitive tool, analyze your data and make smarter decisions.
      </p>
      {/* Image with dashboards */}
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
    </>
  );
}
