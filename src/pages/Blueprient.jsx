import { useState, useRef, useEffect } from "react";
import BriefPanel from "../components/BriefPanel";
import DashboardPanel from "../components/DashboardPanel";
import "../index.css";

function BrandBlueprint() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const briefRef = useRef(null);

  const isBriefScrollable =
    currentStep === 2 || currentStep === 3 || currentStep === 4;

  const handleFormDataChange = (data) => {
    setFormData(data);
    console.log("📊 Real-time form data update:", data);
  };

  useEffect(() => {
    if (briefRef.current) {
      briefRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  return (
    <div className="relative min-h-screen bg-[#9e9ea9] font-inter overflow-hidden">
      <div className="fixed top-[-20%] left-[-20%] w-[140%] h-[140%] animate-float bg-[radial-gradient(circle_at_top_left,rgba(254,182,146,0.2)_0%,rgba(254,182,146,0)_30%),radial-gradient(circle_at_bottom_right,rgba(168,162,255,0.2)_0%,rgba(168,162,255,0)_40%)] -z-10"></div>

      <div className="flex h-screen overflow-hidden">
        <div
          ref={briefRef}
          className={`w-1/2 transition-all duration-300 bg-white/70 backdrop-blur-md ${
            isBriefScrollable
              ? "overflow-y-auto no-scrollbar"
              : "overflow-hidden"
          }`}
        >
          <BriefPanel
            onStepChange={setCurrentStep}
            onFormDataChange={handleFormDataChange}
          />
        </div>

        <div className="w-1/2 overflow-y-auto no-scrollbar bg-white/80 backdrop-blur-md">
          <DashboardPanel formData={formData} />
        </div>
      </div>

      {formData && (
        <div className="fixed bottom-4 right-4 bg-violet-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <span className="text-xs font-semibold">Live Analysis Active</span>
        </div>
      )}
    </div>
  );
}

export default BrandBlueprint;
