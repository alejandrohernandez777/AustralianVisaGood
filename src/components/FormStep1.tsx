import React from 'react';
import { getDocumentRequirements, countryAssessmentLevels } from '../utils/countryData';
import type { StepProps } from '../types';
import { motion } from 'framer-motion';
import { Globe, Calendar, GraduationCap, FileText } from 'lucide-react';

export function FormStep1({ data, updateFields }: StepProps) {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const age = parseInt(value);
    if (!isNaN(age) && age >= 15 && age <= 99) {
      updateFields({ age });
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          Age
        </label>
        <motion.input
          type="number"
          value={data.age || ''}
          onChange={handleAgeChange}
          onBlur={(e) => {
            const value = parseInt(e.target.value);
            if (isNaN(value) || value < 15) {
              updateFields({ age: 15 });
            } else if (value > 99) {
              updateFields({ age: 99 });
            }
          }}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          min="15"
          max="99"
          whileFocus={{ scale: 1.02 }}
        />
        {data.age > 0 && (data.age < 15 || data.age > 99) && (
          <p className="mt-1 text-sm text-red-500">
            Age must be between 15 and 99 years
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Globe className="w-4 h-4 text-blue-500" />
          Country of Origin
        </label>
        <motion.select
          value={data.countryOfOrigin}
          onChange={(e) => updateFields({ countryOfOrigin: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select a country</option>
          {Object.entries(countryAssessmentLevels)
            .sort((a, b) => a[1].name.localeCompare(b[1].name))
            .map(([code, { name, level }]) => (
              <option key={code} value={code}>
                {name} (Assessment Level {level})
              </option>
            ))}
        </motion.select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <GraduationCap className="w-4 h-4 text-blue-500" />
          Current Education Level
        </label>
        <motion.select
          value={data.educationLevel}
          onChange={(e) => updateFields({ educationLevel: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select education level</option>
          <option value="HIGH_SCHOOL">High School</option>
          <option value="BACHELORS">Bachelor's Degree</option>
          <option value="MASTERS">Master's Degree</option>
          <option value="PHD">PhD</option>
        </motion.select>
      </div>

      {data.countryOfOrigin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-100"
        >
          <h4 className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-3">
            <FileText className="w-4 h-4" />
            Required Documents for {countryAssessmentLevels[data.countryOfOrigin]?.name}
          </h4>
          <motion.ul className="space-y-2">
            {getDocumentRequirements(data.countryOfOrigin).map((req, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-blue-700"
              >
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                {req}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </motion.div>
  );
}