'use client';

import {
  BowlFoodIcon,
  CalendarBlankIcon,
  CloudLightningIcon,
  HouseIcon,
  SignInIcon,
  StudentIcon,
} from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccessToken } from './useAccessToken';

const Navbar = () => {
  const { isLoggedIn } = useAccessToken();
  const router = useRouter();

  const pathname = usePathname();

  console.log(isLoggedIn);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-accent/20">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex justify-between items-center px-6 py-4">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => router.push('/')}
        >
          <span className="text-2xl font-bold text-primary font-mono">TUD</span>
          <span className="text-foreground/80 group-hover:text-primary transition-colors">
            Overview
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
            onClick={() => router.push('/mensa')}
          >
            Mensa
          </button>
          <button
            className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
            onClick={() => router.push('/stundenplan')}
          >
            Stundenplan
          </button>
          <button
            className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/80 transition-all"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex justify-between items-center px-4 py-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <span className="text-xl font-bold text-primary font-mono">TUD</span>
        </div>

        <div className="flex-1">overview</div>

        <button
          className={`flex ${
            pathname === '/' ? 'text-accent' : ' text-foreground/70'
          } flex-col items-center p-2 hover:text-primary transition-all`}
          onClick={() => router.push('/')}
        >
          <HouseIcon size={25} />
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-background border-t border-accent/20 py-2 px-4">
        <div className="flex justify-around items-center">
          <button
            className={`flex ${
              pathname === '/mensa' ? 'text-accent' : ' text-foreground/70'
            } flex-col items-center p-2 hover:text-primary transition-all`}
            onClick={() => router.push('/mensa')}
          >
            <BowlFoodIcon />
            <span className="text-xs">Mensa</span>
          </button>

          <button
            className={`flex ${
              pathname === '/wether' ? 'text-accent' : ' text-foreground/70'
            } flex-col items-center p-2 hover:text-primary transition-all`}
            onClick={() => router.push('/wether')}
          >
            <CloudLightningIcon />
            <span className="text-xs">Wether</span>
          </button>

          {isLoggedIn ? (
            <>
              <button
                className={`flex ${
                  pathname === '/stundenplan'
                    ? 'text-accent'
                    : ' text-foreground/70'
                } flex-col items-center p-2 hover:text-primary transition-all`}
                onClick={() => router.push('/stundenplan')}
              >
                <CalendarBlankIcon />
                <span className="text-xs">Stundenplan</span>
              </button>

              <button
                className={`flex ${
                  pathname === '/profile'
                    ? 'text-accent'
                    : ' text-foreground/70'
                } flex-col items-center p-2 hover:text-primary transition-all`}
                onClick={() => router.push('/profile')}
              >
                <StudentIcon />
                <span className="text-xs">Profile</span>
              </button>
            </>
          ) : (
            <div>
              <button
                className={`flex ${
                  pathname === '/login' ? 'text-accent' : ' text-foreground/70'
                } flex-col items-center p-2 hover:text-primary transition-all`}
                onClick={() => router.push('/login')}
              >
                <SignInIcon />
                <span className="text-xs">Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
