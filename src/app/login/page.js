'use client';

import { useAccessToken } from '@/components/useAccessToken';
import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyIcon, UserIcon } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { isLoggedIn, saveToken } = useAccessToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/user/login', {
        username: username,
        password: password,
        grant_type: 'password',
      });

      console.log(res.data);
      saveToken(res.data.accessToken, res.data.expires_in);
      router.push('/profile');
      window.location.reload();
    } catch (err) {
      console.error('Fehler beim Login', err);
      setError('Fehler beim anmelden. Überprüfe deine Daten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isLoggedIn) {
    return <div>you are already logged in</div>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-foreground mb-3 tracking-tight">
              Login
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <p className="text-foreground/50 text-sm font-medium tracking-wide">
              Login to access your Student Data
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Username Field */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground/70 tracking-wider uppercase">
                USERNAME
              </label>
              <div className="relative group">
                <input
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter username"
                  className="w-full px-4 py-4 bg-background/60 border border-transparent rounded-2xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent focus:bg-background/80 transition-all duration-300 font-medium tracking-wide group-hover:border-accent/40"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 group-hover:text-primary transition-colors">
                  <UserIcon size={20} />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground/70 tracking-wider uppercase">
                PASSWORD
              </label>
              <div className="relative group">
                <input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 bg-background/60 border border-transparent rounded-2xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent focus:bg-background/80 transition-all duration-300 font-medium tracking-wide group-hover:border-accent/40"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 group-hover:text-primary transition-colors">
                  <KeyIcon size={20} />
                </div>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              onClick={handleLogin}
              disabled={isLoading || !username || !password}
              className="w-full py-4 bg-accent  text-background font-black rounded-2xl shadow-lg hover:shadow-primary/10 hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none tracking-wider text-sm uppercase relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-accent border-t-accent rounded-full animate-spin mr-3"></div>
                </div>
              ) : (
                'LOGIN'
              )}
            </motion.button>
            <span className="flex justify-center items-center text-center text-red-500">
              {error}
            </span>
          </div>
        </div>

        {/* Subtle Border Glow */}
        <div className="absolute -inset-1 rounded-3xl blur-sm -z-10"></div>
      </motion.div>
    </div>
  );
}
