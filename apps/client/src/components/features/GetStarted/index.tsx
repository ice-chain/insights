import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChartsDemo } from '@/components/features/ChartsStubs';
import { useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";

export function GetStarted() {
  const { isSignedIn, isLoaded } = useUser();

  const  { t } = useTranslation();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex mt-12">
      <div>
        <p className="text-6xl max-w-2xl">
          {t('getStarted.title')}

        </p>
        <p className="text-md max-w-xl mt-12">
          {t('getStarted.description')}
        </p>
        <Button
          asChild
          variant="primary"
          className="mt-24 w-fit text-xl"
        >
          <Link
            className="inline-flex items-center"
            to={isSignedIn ? "/dashboard" : "/sign-up"}
          >
            {t('getStarted.action')}
          </Link>
        </Button>
      </div>
      <ChartsDemo />
    </div>
  );
}
