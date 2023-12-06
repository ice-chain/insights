import { BarChart2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface LogoProps {
  vertical?: boolean;
}

export function Logo(props: LogoProps) {
  const {
    vertical = false
  } = props;

  return (
      <div className={cn(
        'align-middle flex items-center gap-2 p-2',
        vertical && 'flex-col'
      )}>
        <Link
          to="/"
          className="bg-gradient-to-br from-[#B900B4] to-[#F50000] text-white rounded-md w-9 h-9 flex justify-center items-center"
        >
          <BarChart2 size={32} strokeWidth={3} />
        </Link>
        <Link
          to="/"
          className="font-kalam text-4xl h-9 p-1"
        >
          Insights
        </Link>
      </div>
  );
}
