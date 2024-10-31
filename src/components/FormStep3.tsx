import React from 'react';
import type { StepProps } from '../types';

export function FormStep3({ data, updateFields }: StepProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Australian Student Visa Eligibility Calculator
      </h1>

      {/* Progress indicator */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">Step 3 of 3</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Health Insurance */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Do you have valid health insurance?
        </h3>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="healthInsurance"
              checked={data.healthInsurance === true}
              onChange={() => updateFields({ healthInsurance: true })}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="healthInsurance"
              checked={data.healthInsurance === false}
              onChange={() => updateFields({ healthInsurance: false })}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {/* Financial Status */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Financial Status
        </h3>
        <select
          value={data.financialStatus || ''}
          onChange={(e) => updateFields({ financialStatus: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select your financial status</option>
          <option value="SUFFICIENT">Sufficient funds available</option>
          <option value="SCHOLARSHIP">Full scholarship</option>
          <option value="LOAN">Education loan approved</option>
          <option value="PARTIAL">Partial funds available</option>
        </select>
      </div>
    </div>
  );
}
