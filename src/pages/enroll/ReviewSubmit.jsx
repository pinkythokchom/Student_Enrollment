import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { useEnrollForm } from "../../context/EnrollFormContext";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";

const ReviewSubmit = () => {
  const navigate = useNavigate();
  const { data, canAccessStep, resetForm } = useEnrollForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showJSON, setShowJSON] = useState(false);

  // 🔒 Guard — must complete previous steps
  if (!canAccessStep(4)) {
    return <Navigate to="/enroll/step-1" />;
  }

  const handleSubmit = async () => {
    setSubmitting(true);

    // simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    console.log("FINAL ENROLLMENT PAYLOAD:", data);

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <Card className="max-w-xl w-full text-center shadow-xl">
        <CardHeader>
          <h2 className="text-3xl font-serif font-bold text-green-700">
            Enrollment Successful 🎉
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Your enrollment has been submitted successfully.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>

            <Button
            onClick={() => {
                navigate("/enroll/step-1");
                setTimeout(() => resetForm(), 0);
            }}
            >
            Start New Enrollment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Steps */}
        <div className="flex justify-between">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold
                ${index === 3
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"}
              `}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  index === 3 ? "text-black" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* STUDENT */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-bold">Student Details</h3>
            <Button
              variant="outline"
              onClick={() => navigate("/enroll/step-1")}
            >
              Edit
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><b>Name:</b> {data.student?.fullName}</p>
            <p><b>Email:</b> {data.student?.email}</p>
            <p><b>Mobile:</b> +91 {data.student?.mobile}</p>
            <p><b>Class:</b> {data.student?.classLevel}</p>
            <p><b>Board:</b> {data.student?.board}</p>
            <p><b>Language:</b> {data.student?.language}</p>
          </CardContent>
        </Card>

        {/* ACADEMIC */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-bold">Academic Details</h3>
            <Button
              variant="outline"
              onClick={() => navigate("/enroll/step-2")}
            >
              Edit
            </Button>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <p><b>Subjects:</b> {data.academic?.subjects?.join(", ")}</p>
            <p><b>Exam Goal:</b> {data.academic?.goal}</p>
            <p><b>Weekly Study Hours:</b> {data.academic?.hours}</p>
            <p><b>Scholarship:</b> {data.academic?.scholarship ? "Yes" : "No"}</p>
            {data.academic?.scholarship && (
              <>
                <p><b>Percentage:</b> {data.academic?.percentage}%</p>
                <p><b>Achievements:</b> {data.academic?.achievements}</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* ADDRESS */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-bold">Address & Payment</h3>
            <Button
              variant="outline"
              onClick={() => navigate("/enroll/step-3")}
            >
              Edit
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><b>PIN:</b> {data.address?.pinCode}</p>
            <p><b>City:</b> {data.address?.city}</p>
            <p><b>State:</b> {data.address?.state}</p>
            <p className="md:col-span-2">
              <b>Address:</b> {data.address?.addressLine}
            </p>
            <p><b>Guardian:</b> {data.address?.guardianName}</p>
            <p><b>Guardian Mobile:</b> {data.address?.guardianMobile}</p>
            <p><b>Payment Plan:</b> {data.address?.paymentPlan}</p>
            <p><b>Payment Mode:</b> {data.address?.paymentMode}</p>
          </CardContent>
        </Card>

        {/* ACTIONS */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/enroll/step-3")}
          >
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="min-w-[160px]"
          >
            {submitting ? "Submitting..." : "Submit Enrollment"}
          </Button>
        </div>

        {/* JSON TOGGLE */}
        <div className="pt-4">
          <button
            onClick={() => setShowJSON(!showJSON)}
            className="text-sm text-blue-600 underline"
          >
            {showJSON ? "Hide" : "Show"} Raw JSON
          </button>

          {showJSON && (
            <pre className="mt-4 bg-black text-green-400 p-4 rounded-md text-xs overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
