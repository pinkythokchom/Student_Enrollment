import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { studentSchema } from "../../schemas/student.schema";
import { useEnrollForm } from "../../context/EnrollFormContext";

import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Button } from "../../components/ui/button";

const Student = () => {
  const navigate = useNavigate();
  const { updateStepData, data } = useEnrollForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: data.student || {},
  });

  const onSubmit = (values) => {
    updateStepData("student", values);
    navigate("/enroll/step-2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 px-4 py-14">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Steps */}
        <div className="flex justify-between">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center
                  text-sm font-bold transition-all duration-300
                  ${index === 0
                    ? "bg-gradient-to-r from-black to-gray-800 text-white scale-110 shadow-md"
                    : "bg-gray-200 text-gray-600"}
                `}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  index === 0 ? "text-black" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <Card
          className="
            rounded-2xl
            border border-gray-200
            bg-white/90 backdrop-blur
            shadow-md hover:shadow-xl
            transition-all duration-300
          "
        >
          <CardHeader className="space-y-1">
            <h2 className="text-3xl font-serif font-extrabold tracking-tight text-gray-900">
              Student Details
            </h2>
            <p className="text-sm text-gray-500">
              Enter basic student information
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-7"
            >
              {/* Full Name */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  {...register("fullName")}
                  className="mt-1 rounded-lg focus:ring-2 focus:ring-black/20"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  {...register("email")}
                  className="mt-1 rounded-lg focus:ring-2 focus:ring-black/20"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mobile
                </Label>
                <div className="flex gap-2 mt-1">
                  <span className="px-3 flex items-center rounded-lg bg-gray-100 border text-sm">
                    +91
                  </span>
                  <Input
                    {...register("mobile")}
                    className="rounded-lg focus:ring-2 focus:ring-black/20"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Class
                </Label>
                <Select
                  {...register("classLevel")}
                  className="mt-1 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Select>
                {errors.classLevel && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.classLevel.message}
                  </p>
                )}
              </div>

              {/* Board */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Board
                </Label>
                <Select
                  {...register("board")}
                  className="mt-1 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                </Select>
                {errors.board && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.board.message}
                  </p>
                )}
              </div>

              {/* Language */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Preferred Language
                </Label>
                <Select
                  {...register("language")}
                  className="mt-1 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hinglish">Hinglish</option>
                </Select>
                {errors.language && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.language.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="md:col-span-2 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full h-12 text-base font-semibold
                    bg-gradient-to-r from-black to-gray-800
                    hover:from-gray-800 hover:to-black
                    hover:shadow-lg hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all duration-300
                  "
                >
                  Continue to Academic →
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Student;
