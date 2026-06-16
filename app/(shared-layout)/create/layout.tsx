import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="orb orb-violet -top-20 -right-60 opacity-20" />
      <div className="orb orb-blue bottom-20 -left-40 opacity-15" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-16">
        {children}
      </div>
    </div>
  );
};

export default CreateLayout;
