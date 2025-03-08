"use client"

const ErrorPage = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1>Ops, it seems like something went wrong.</h1>
      <p>{error}</p>
    </div>
  );
};

export default ErrorPage;