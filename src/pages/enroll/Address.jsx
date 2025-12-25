import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Navigate } from "react-router-dom";

import { addressSchema } from "../../schemas/address.schema";
import { useEnrollForm } from "../../context/EnrollFormContext";

import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Button } from "../../components/ui/button";

const Address = () => {
  const navigate = useNavigate();
  const { data, updateStepData, canAccessStep } = useEnrollForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: data.address || {},
  });

  // 🔒 Route guard
  if (!canAccessStep(3)) {
    return <Navigate to="/enroll/step-1" />;
  }

  const onSubmit = (values) => {
    updateStepData("address", values);
    navigate("/enroll/review");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-12">

        {/* Steps Indicator */}
        <div className="flex justify-between">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${
                    index === 2
                      ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white scale-110 shadow-md"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  index === 2 ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

          {/* Address Information */}
          <Card className="rounded-2xl bg-white shadow-md">
            <CardHeader className="pb-4">
              <h2 className="text-3xl font-serif font-extrabold">
                Address Information
              </h2>
              <p className="text-sm text-gray-500">
                Provide current residential details
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <Label>PIN Code</Label>
                  <Input {...register("pinCode")} />
                  {errors.pinCode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.pinCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>State / UT</Label>
                  <Input {...register("state")} />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>City</Label>
                  <Input {...register("city")} />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label>Address Line</Label>
                  <Input {...register("addressLine")} />
                  {errors.addressLine && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.addressLine.message}
                    </p>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Guardian Details */}
          <Card className="rounded-2xl bg-white shadow-md">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-serif font-bold">
                Guardian Details
              </h2>
              <p className="text-sm text-gray-500">
                Parent or guardian contact information
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <Label>Guardian Name</Label>
                  <Input {...register("guardianName")} />
                  {errors.guardianName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.guardianName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Guardian Mobile</Label>
                  <Input {...register("guardianMobile")} />
                  {errors.guardianMobile && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.guardianMobile.message}
                    </p>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Payment Preferences */}
          <Card className="rounded-2xl bg-white shadow-md">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-serif font-bold">
                Payment Preferences
              </h2>
              <p className="text-sm text-gray-500">
                Choose your preferred payment options
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <Label>Payment Plan</Label>
                  <Select {...register("paymentPlan")}>
                    <option value="">Select</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Annual">Annual</option>
                  </Select>
                  {errors.paymentPlan && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.paymentPlan.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Payment Mode</Label>
                  <Select {...register("paymentMode")}>
                    <option value="">Select</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="NetBanking">NetBanking</option>
                  </Select>
                  {errors.paymentMode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.paymentMode.message}
                    </p>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/enroll/step-2")}
            >
              Back
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:shadow-lg transition"
            >
              Continue to Review →
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Address;
