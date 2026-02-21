import React from "react";

export default function CallAdviserSection() {
  return (
    <section
      className="bg-cover bg-center py-16 px-6"
      style={{ backgroundImage: "url('/images/mep-bg.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-2xl max-w-5xl mx-auto text-white text-center shadow-xl">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-orange-500 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.45h12.2a1 1 0 00.9-1.45L17 13M7 13l1.5 6m8.5-6l-1.5 6"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">CoolRite MEP SERVICES</h2>
        <p className="text-lg mb-6">Call adviser for Multiline group of companies services</p>
        <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 transition duration-300">
          REQUEST PROPOSAL
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center text-white">
        <div>
          <h3 className="text-2xl font-bold">385</h3>
          <p>Projects</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">842</h3>
          <p>Complete Goals</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">230</h3>
          <p>Qualify Staff</p>
        </div>
        {/* You can add the 4th div here if needed */}
      </div>
    </section>
  );
}
