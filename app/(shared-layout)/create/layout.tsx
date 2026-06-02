import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 py-8 px-4">
        <h1 className="text-2xl font-bold"></h1>
        {children}
      </div>
    </>
  );
};

export default CreateLayout;
