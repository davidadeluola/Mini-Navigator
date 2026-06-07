import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        {" "}
        {/* ← wrap children in a width container */}
        {children}
      </div>
    </div>
  );
};

export default CreateLayout;
