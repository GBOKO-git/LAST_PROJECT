const EditProfile = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl overflow-hidden">
          {/* Étapes du formulaire */}
          <div className="grid md:grid-cols-4 border-b border-cyan-200">
            {[
              { title: "Personal Information", icon: "user" },
              { title: "Contact Details", icon: "phone" },
              { title: "Address", icon: "map" },
              { title: "Confirmation", icon: "check" },
            ].map((step, index) => (
              <div
                key={index}
                className={`p-6 border-r border-cyan-200 text-center relative ${
                  index === 0 ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      index === 0 ? "bg-cyan-500" : "bg-cyan-300"
                    } text-white flex items-center justify-center relative z-10`}
                  >
                    {step.icon === "user" && (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                    {step.icon === "phone" && (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
                        />
                      </svg>
                    )}
                    {step.icon === "map" && (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.66 16.66L13.41 20.9a2 2 0 01-2.82 0l-4.25-4.24a8 8 0 1111.32 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                    {step.icon === "check" && (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-cyan-700">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Contenu de l'étape active */}
          <div className="p-12">
            <h2 className="text-3xl font-bold mb-8 text-cyan-800">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-3 text-sm font-medium text-cyan-700">
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 border-2 border-cyan-500 rounded-xl bg-transparent 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 pl-10"
                  />
                  <svg
                    className="h-5 w-5 text-cyan-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-cyan-700">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 border-2 border-cyan-500 rounded-xl bg-transparent 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 pl-10"
                  />
                  <svg
                    className="h-5 w-5 text-cyan-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-3 text-sm font-medium text-cyan-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border-2 border-cyan-500 rounded-xl bg-transparent 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 pl-10"
                  />
                  <svg
                    className="h-5 w-5 text-cyan-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-10">
              <p className="text-sm text-cyan-600">Step 1 of 4</p>
              <button className="px-8 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors flex items-center">
                Continue
                <svg
                  className="h-5 w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;