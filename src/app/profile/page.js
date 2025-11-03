'use client';

import { useAccessToken } from '@/components/useAccessToken';

export default function Profile() {
  const { isLoggedIn, removeToken } = useAccessToken();

  if (!isLoggedIn) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <button onClick={() => removeToken()}>Logout</button>
    </div>
  );
}
