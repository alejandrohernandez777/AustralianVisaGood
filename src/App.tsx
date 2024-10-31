import React from 'react';
import { FormStep1 } from './components/FormStep1';
import { FormStep2 } from './components/FormStep2';
import { FormStep3 } from './components/FormStep3';
import { useState, useCallback } from 'react';
import type { VisaFormData } from './types';
import { Results } from './components/Results';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<VisaFormData>({
    age: 0,
    countryOfOrigin: '',
    intendedStudy: '',
    selectedField: '',
    hasRelatedStudy: false,
    priorStudyDetails: '',
    hasWorkExperience: false,
    workExperienceYears: 0,
    englishProficiency: '',
    englishTestScore: '',
    previousVisa: '',
    healthInsurance: false,
    financialStatus: '',
    studyPoints: 0,
    educationLevel: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateCurrentStep = useCallback(() => {
    switch (currentStepIndex) {
      case 0:
        return !!(
          formData.age > 0 &&
          formData.countryOfOrigin &&
          formData.educationLevel
        );
      case 1:
        return !!(
          formData.intendedStudy &&
          formData.selectedField &&
          formData.englishProficiency &&
          (formData.englishProficiency === 'NATIVE' ||
            formData.englishTestScore)
        );
      case 2:
        return typeof formData.healthInsurance === 'boolean' && !!formData.financialStatus;
      default:
        return false;
    }
  }, [currentStepIndex, formData]);

  const updateFields = useCallback((fields: Partial<VisaFormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      return updated;
    });
  }, []);

  React.useEffect(() => {
    setIsFormValid(validateCurrentStep());
  }, [formData, currentStepIndex, validateCurrentStep]);

  const steps = [
    <FormStep1 key="step1" data={formData} updateFields={updateFields} />,
    <FormStep2 key="step2" data={formData} updateFields={updateFields} />,
    <FormStep3 key="step3" data={formData} updateFields={updateFields} />,
  ];

  function handleNext() {
    if (!isFormValid) return;

    if (currentStepIndex === steps.length - 1) {
      setShowResults(true);
    } else {
      setCurrentStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    setCurrentStepIndex((i) => i - 1);
  }

  function handleStartOver() {
    setShowResults(false);
    setCurrentStepIndex(0);
    setFormData({
      age: 0,
      countryOfOrigin: '',
      intendedStudy: '',
      selectedField: '',
      hasRelatedStudy: false,
      priorStudyDetails: '',
      hasWorkExperience: false,
      workExperienceYears: 0,
      englishProficiency: '',
      englishTestScore: '',
      previousVisa: '',
      healthInsurance: false,
      financialStatus: '',
      studyPoints: 0,
      educationLevel: '',
    });
  }

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen bg-gray-50 py-8"
      >
        <div className="max-w-4xl mx-auto px-4">
          <Results data={formData} />
          <motion.div
            className="mt-6 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleStartOver}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              Start New Assessment
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-lg"
      >
        <div className="p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStepIndex + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      scale: step === currentStepIndex + 1 ? 1.1 : 1,
                    }}
                  >
                    {step}
                  </motion.div>
                  {step < 3 && (
                    <div
                      className={`h-1 w-16 sm:w-32 ${
                        step <= currentStepIndex
                          ? 'bg-blue-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {steps[currentStepIndex]}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {currentStepIndex > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!isFormValid}
              className={`px-4 py-2 ${
                currentStepIndex === steps.length - 1
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white rounded-lg transition-colors flex items-center gap-2 ${
                currentStepIndex === 0 ? 'ml-auto' : ''
              } ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {currentStepIndex === steps.length - 1 ? 'Submit' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}