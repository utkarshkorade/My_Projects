import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import Login from "./Components/Login";
import { Routes, Route} from "react-router-dom"
import StudentForm from "./ResistrationForm/StudentForm";
import IndustrialForm from "./ResistrationForm/IndustrialForm";
import AdminForm from "./ResistrationForm/AdminForm";
import StudentDashboard from "./Dashboard/StudentDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import IndustrialDashboard from "./Dashboard/IndustrialDashboard";
import Profile from "./Dashboard/Profile";
import IndustryPage from "./Dashboard/Industrypage";
import Industrydata from "./Dashboard/Industrydata";
import Studentdata from "./Dashboard/studentdata";

function App() {
  return (
    <>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />

              {/* resistration routes */}
              <Route path="/StudentRegister" element={<StudentForm/>} />   
              <Route path="/IndustrialRegister" element={<IndustrialForm/>} />
              <Route path="/adminResister" element={<AdminForm/>} />

             {/* dashbord routes */}
              <Route path="/student" element={<StudentDashboard />}/>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/industrialowner" element={<IndustrialDashboard/>} />
              {/* Profile routes */}
              <Route path="/profile" element={<Profile/>} />
              <Route path="/industrydashboard" element={<IndustrialDashboard/>} />
              <Route path="/Industrypage" element={<IndustryPage/>} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/Industrydata" element={<Industrydata/>} />
              <Route path="/Studentdata" element={<Studentdata/>} />
            </Routes>
          </>
  );
}

export default App;
