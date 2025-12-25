import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Navigate } from "react-router-dom";

import { academicSchema } from "../../schemas/academic.schema";
import { useEnrollForm } from "../../context/EnrollFormContext";

import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const SUBJECTS_BY_CLASS = {
  "9": ["English", "Mathematics", "Science", "Social Science", "Hindi"],
  "10": ["English", "Mathematics", "Science", "Social Science", "Hindi"],
  "11": ["Physics", "Chemistry", "Mathematics", "Biology"],
  "12": ["Physics", "Chemistry", "Mathematics", "Biology"],
};

const Academic = () => {
  const navigate = useNavigate();
  const { data, updateStepData, canAccessStep } = useEnrollForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(academicSchema),
    mode: "onChange",
    defaultValues: data.academic || {
      subjects: [],
      scholarship: false,
    },
  });

  if (!canAccessStep(2)) {
    return <Navigate to="/enroll/step-1" />;
  }

  const scholarship = watch("scholarship");
  const selectedClass = data.student?.classLevel;

  const onSubmit = (values) => {
    updateStepData("academic", values);
    navigate("/enroll/step-3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 px-4 py-14">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Steps */}
        <div className="flex justify-between">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center
                  text-sm font-bold transition-all duration-300
                  ${index === 1
                    ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white scale-110 shadow-md"
                    : "bg-gray-200 text-gray-600"}
                `}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  index === 1 ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <Card className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur shadow-md hover:shadow-xl transition-all duration-300">
          <CardHeader className="space-y-1">
            <h2 className="text-3xl font-serif font-extrabold tracking-tight text-gray-900">
              Academic Details
            </h2>
            <p className="text-sm text-gray-500">
              Tell us about subjects and study preferences
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Subjects */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Subjects
                </Label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {SUBJECTS_BY_CLASS[selectedClass]?.map((subject) => (
                    <label
                      key={subject}
                      className="
                        flex items-center gap-2 px-4 py-2 rounded-full
                        border border-gray-300
                        text-sm font-medium
                        cursor-pointer
                        transition-all duration-200
                        hover:bg-indigo-50 hover:border-indigo-400
                      "
                    >
                      <input
                        type="checkbox"
                        value={subject}
                        {...register("subjects")}
                        className="accent-indigo-600"
                      />
                      {subject}
                    </label>
                  ))}
                </div>
                {errors.subjects && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.subjects.message}
                  </p>
                )}
              </div>

              {/* Goal */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Exam Goal
                </Label>
                <select
                  {...register("goal")}
                  className="
                    mt-1 w-full h-11 rounded-lg border border-gray-300 px-3
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                    transition-all
                  "
                >
                  <option value="">Select goal</option>
                  <option value="Board Excellence">Board Excellence</option>
                  <option value="Concept Mastery">Concept Mastery</option>
                  <option value="Competitive Prep">Competitive Prep</option>
                </select>
                {errors.goal && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.goal.message}
                  </p>
                )}
              </div>

              {/* Hours */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Weekly Study Hours
                </Label>
                <Input
                  type="number"
                  {...register("hours", { valueAsNumber: true })}
                  className="mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500/30"
                />
                {errors.hours && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.hours.message}
                  </p>
                )}
              </div>

              {/* Scholarship */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <Checkbox {...register("scholarship")} />
                <Label className="text-sm font-medium">
                  Applying for scholarship?
                </Label>
              </div>

              {/* Conditional Fields */}
              {scholarship && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Last Exam Percentage
                    </Label>
                    <Input
                      type="number"
                      {...register("percentage", { valueAsNumber: true })}
                      className="mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500/30"
                    />
                    {errors.percentage && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.percentage.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Achievements (optional)
                    </Label>
                    <Textarea
                      {...register("achievements")}
                      className="mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-gray-100"
                  onClick={() => navigate("/enroll/step-1")}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="
                    bg-gradient-to-r from-indigo-700 to-blue-600
                    hover:from-blue-600 hover:to-indigo-700
                    hover:shadow-lg hover:-translate-y-0.5
                    transition-all duration-300
                  "
                >
                  Continue →
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Academic;
