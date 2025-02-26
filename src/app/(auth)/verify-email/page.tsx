'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { verifyEmail } from '../actions';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const token = searchParams.get('token');
  const tokenHash = searchParams.get('tokenHash');

  useEffect(() => {
    async function verify() {
      if (!token || !tokenHash) {
        setError('It seems that the link is invalid');
        return;
      }

      const error = await verifyEmail(token, tokenHash);

      if (error) {
        setError(error);
        return;
      }

      setSuccess(true);
    }

    verify();
  }, [token, tokenHash]);

  if (success) {
    return <div>Success</div>;
  }

  if (error) {
    return <div>{error && <div>{error}</div>}</div>;
  }

  return <div>Loading...</div>;
};

export default function Wrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>{<VerifyEmailPage />}</Suspense>
  );
}
