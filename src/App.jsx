import { Route, Routes } from "react-router-dom";
import Form from "./rtk_comps/Form";
import EditForm from "./rtk_comps/EditForm";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Form />} />
        <Route path="/edit" element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;
