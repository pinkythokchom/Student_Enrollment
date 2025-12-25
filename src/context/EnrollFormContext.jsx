import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const EnrollFormContext = createContext();
const initialState = {
  student: null,
  academic: null,
  address: null,
};
export function EnrollFormProvider({ children }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    student: null,
    academic: null,
    address: null,
  });

  const updateStepData = (step, values) => {
    setData((prev) => ({
      ...prev,
      [step]: values,
    }));
  };

  const canAccessStep = (step) => {
    if (step === 1) return true;
    if (step === 2) return !!data.student;
    if (step === 3) return !!data.student && !!data.academic;
    if (step === 4)
      return !!data.student && !!data.academic && !!data.address;
    return false;
  };

  const goToStep = (step) => {
    if (!canAccessStep(step)) return navigate("/enroll/step-1");

    if (step === 1) navigate("/enroll/step-1");
    if (step === 2) navigate("/enroll/step-2");
    if (step === 3) navigate("/enroll/step-3");
    if (step === 4) navigate("/enroll/review");
  };

  const resetForm = () => {
    setData(initialState);
  };
  return (
    <EnrollFormContext.Provider
      value={{
        data,
        updateStepData,
        canAccessStep,
        goToStep,
        resetForm,
      }}
    >
      {children}
    </EnrollFormContext.Provider>
  );
}

export function useEnrollForm() {
  return useContext(EnrollFormContext);
}
