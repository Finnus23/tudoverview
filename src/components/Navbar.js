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
            onClick={() => router.push('/timetable')}
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

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-background border-t border-accent/20 py-2 px-4">
        <div className="flex justify-around items-center">
          <button
            className={`flex ${
              pathname === '/mensa'
                ? 'text-accent bg-[rgba(81,81,81,0.15)] rounded-2xl'
                : ' text-foreground/70'
            } flex-col items-center p-2 hover:text-primary transition-all w-14`}
            onClick={() => router.push('/mensa')}
          >
            <BowlFoodIcon />
            <span className="text-xs">Mensa</span>
          </button>

          <button
            className={`flex ${
              pathname === '/weather'
                ? 'text-accent bg-[rgba(81,81,81,0.15)] rounded-2xl'
                : ' text-foreground/70'
            } flex-col items-center p-2 hover:text-primary transition-all w-14`}
            onClick={() => router.push('/weather')}
          >
            <CloudLightningIcon />
            <span className="text-xs">Wetter</span>
          </button>

          {isLoggedIn ? (
            <>
              <button
                className={`flex ${
                  pathname === '/timetable'
                    ? 'text-accent bg-[rgba(81,81,81,0.15)] rounded-2xl'
                    : ' text-foreground/70'
                } flex-col items-center p-2 hover:text-primary transition-all w-18`}
                onClick={() => router.push('/timetable')}
              >
                <CalendarBlankIcon />
                <span className="text-xs">Stundenplan</span>
              </button>

              <button
                className={`flex ${
                  pathname === '/profile'
                    ? 'text-accent bg-[rgba(81,81,81,0.15)] rounded-2xl'
                    : ' text-foreground/70'
                } flex-col items-center p-2 hover:text-primary transition-all w-14`}
                onClick={() => router.push('/profile')}
              >
                <StudentIcon />
                <span className="text-xs">Profile</span>
              </button>
            </>
          ) : (
            <div className="flex justify-around items-center">
              <button
                className={`flex ${
                  pathname === '/login'
                    ? 'text-accent bg-[rgba(81,81,81,0.15)] rounded-2xl'
                    : ' text-foreground/70'
                } flex-col items-center p-2 hover:text-primary transition-all w-14`}
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
