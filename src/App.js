import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Student from "./pages/enroll/Student";
import Academic from "./pages/enroll/Academic";
import Address from "./pages/enroll/Address";
import ReviewSubmit from "./pages/enroll/ReviewSubmit";
import { EnrollFormProvider } from "./context/EnrollFormContext";

function App() {
  return (
    <BrowserRouter>
      <EnrollFormProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/enroll/step-1" />} />
          <Route path="/enroll/step-1" element={<Student />} />
          <Route path="/enroll/step-2" element={<Academic />} />
          <Route path="/enroll/step-3" element={<Address />} />
          <Route path="/enroll/review" element={<ReviewSubmit />} />
        </Routes>
      </EnrollFormProvider>
    </BrowserRouter>
  );
}

export default App;
