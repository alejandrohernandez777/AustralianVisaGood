import React from 'react';
import type { StepProps } from '../types';
import { motion } from 'framer-motion';
import { Book, Briefcase, Languages, History } from 'lucide-react';
import { studyFields } from '../utils/studyFields';

export function FormStep2({ data, updateFields }: StepProps) {
  const handleWorkExperienceChange = (value: boolean) => {
    updateFields({ hasWorkExperience: value });
    if (!value) {
      updateFields({ workExperienceYears: 0 });
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Program Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Book className="w-4 h-4 text-blue-500" />
          Intended Program
        </label>
        <motion.select
          value={data.intendedStudy}
          onChange={(e) => updateFields({ intendedStudy: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select a program</option>
          <option value="Certificate">Certificate</option>
          <option value="Diploma">Diploma</option>
          <option value="Advanced Diploma">Advanced Diploma</option>
          <option value="Bachelor">Bachelor's Degree</option>
          <option value="Master">Master's Degree</option>
          <option value="PhD">PhD</option>
        </motion.select>
      </div>

      {/* Field Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Book className="w-4 h-4 text-blue-500" />
          Field of Study
        </label>
        <motion.select
          value={data.selectedField}
          onChange={(e) => updateFields({ selectedField: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select a field</option>
          {Object.entries(studyFields).map(([key, field]) => (
            <option key={key} value={key}>{field.name}</option>
          ))}
        </motion.select>

        {data.selectedField && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-gray-600"
          >
            {studyFields[data.selectedField].description}
          </motion.div>
        )}
      </div>

      {/* Related Study Experience */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 text-blue-500" />
          Previous Related Study
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasRelatedStudy === true}
              onChange={() => updateFields({ hasRelatedStudy: true })}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasRelatedStudy === false}
              onChange={() => updateFields({ hasRelatedStudy: false })}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">No</span>
          </label>
        </div>

        {data.hasRelatedStudy && (
          <motion.textarea
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            value={data.priorStudyDetails}
            onChange={(e) => updateFields({ priorStudyDetails: e.target.value })}
            placeholder="Please describe your previous study experience..."
            className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        )}
      </div>

      {/* Work Experience */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 text-blue-500" />
          Relevant Work Experience
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasWorkExperience === true}
              onChange={() => handleWorkExperienceChange(true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasWorkExperience === false}
              onChange={() => handleWorkExperienceChange(false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">No</span>
          </label>
        </div>

        {data.hasWorkExperience && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <label className="block text-sm text-gray-600">Years of Experience</label>
            <input
              type="number"
              value={data.workExperienceYears || ''}
              onChange={(e) => updateFields({ workExperienceYears: parseInt(e.target.value) || 0 })}
              min="0"
              max="50"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>
        )}
      </div>

      {/* English Proficiency */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Languages className="w-4 h-4 text-blue-500" />
          English Proficiency
        </label>
        <motion.select
          value={data.englishProficiency}
          onChange={(e) => {
            updateFields({ 
              englishProficiency: e.target.value,
              englishTestScore: e.target.value === 'NATIVE' ? 'NATIVE' : ''
            });
          }}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select proficiency level</option>
          <option value="NATIVE">Native English Speaker</option>
          <option value="IELTS">IELTS</option>
          <option value="TOEFL">TOEFL</option>
          <option value="PTE">PTE Academic</option>
        </motion.select>

        {data.englishProficiency && data.englishProficiency !== 'NATIVE' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2"
          >
            <label className="block text-sm text-gray-600">Test Score</label>
            <input
              type="number"
              step="0.5"
              value={data.englishTestScore || ''}
              onChange={(e) => updateFields({ englishTestScore: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`Enter your ${data.englishProficiency} score`}
            />
            <motion.p 
              className="mt-1 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {data.englishProficiency === 'IELTS' && 'Score range: 0-9'}
              {data.englishProficiency === 'TOEFL' && 'Score range: 0-120'}
              {data.englishProficiency === 'PTE' && 'Score range: 10-90'}
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Previous Visa History */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <History className="w-4 h-4 text-blue-500" />
          Previous Visa History
        </label>
        <motion.select
          value={data.previousVisa}
          onChange={(e) => updateFields({ previousVisa: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select visa history</option>
          <option value="NO_VISA">No previous visa</option>
          <option value="STUDENT_VISA">Previous student visa</option>
          <option value="TOURIST_VISA">Previous tourist visa</option>
          <option value="WORKING_VISA">Previous working visa</option>
          <option value="VISA_REFUSED">Previous visa refused</option>
        </motion.select>
      </div>
    </motion.div>
  );
}