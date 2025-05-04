'use client';

import { Loading } from '@/components/loading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { verifyEmail } from '@/services/user.service';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const tokenHash = searchParams.get('tokenHash');

  useEffect(() => {
    async function verify() {
      if (!tokenHash) {
        setError('It seems that the link is invalid');
        return;
      }

      const error = await verifyEmail(tokenHash);

      if (error) {
        setError(error);
        return;
      }

      // Here we add the isEmailVerified to the localstorage
      localStorage.setItem(
        'emailVerification',
        JSON.stringify({ isVerified: true })
      );

      setSuccess(true);
    }

    verify();
  }, [tokenHash]);

  // * This will return if the verification is complete and is successful
  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your verification proccess is complete!</CardTitle>
        </CardHeader>
        <CardContent>You can now close this window.</CardContent>
      </Card>
    );
  }

  // * This will return if there is an error in the verification or there are no data
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            It seems like there was an error in your verification proccess.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-destructive">
            {error}
          </CardDescription>
          <CardDescription>
            Please try again or contact us if the problem persists.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  // * This is the default state for when the verification is not complete
  return <Loading />;
};

// * This wrapper is because of the useSearchParams hook
export default function Wrapper() {
  return (
    <Suspense fallback={<Loading />}>{<VerifyEmailPage />}</Suspense>
  );
}
