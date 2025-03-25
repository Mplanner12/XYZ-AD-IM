"use client";

import { ElementType, useState } from "react";
import GeneralInformation from "./business-information/general-information";
import AccountModule from "./business-information/AccountModule";

export default function MainForm() {
  const steps: { id: string; name: string; component: ElementType }[] = [
    {
      id: "1",
      name: "General Information",
      // component: GeneralInformation,
      component: AccountModule,
    },
    {
      id: "2",
      name: "Account Module",
      component: AccountModule,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );

  const onNext = () => {
    setCompletedSteps((prev) => {
      const newCompletedSteps = [...prev];
      newCompletedSteps[currentStep] = true;
      return newCompletedSteps;
    });
    setCurrentStep((step) => step + 1);
  };

  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const StepComponent = steps[currentStep]?.component;

  return (
    <section className="w-full flex flex-col justify-start items-center">
      <div className="stepper-container flex-row flex gap-2.5 mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? "active" : ""} ${
              completedSteps[index] ? "completed" : ""
            } bg-foundation-purple-purple-100`}
          ></div>
        ))}
      </div>

      {/* Render the current step component */}
      <StepComponent onNext={onNext} onPrev={onPrev} />
    </section>
  );
}
