import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./components/Dashboard";
import ItemForm from "./components/Item/ItemForm";
import ViewItem from "./components/Item/ViewItem";
import Purchase from "./components/Purchase/Purchase";
import CompanyForm from "./components/Company/CompanyForm";
import CompanyEditForm from "./components/Company/CompanyEditForm";
import Login from "./components/Login";
import CreatePurchase from "./components/Purchase/CreatePurchase";
import Printpdf from "./components/Purchase/Printpdf";
import CreateCustomer from "./components/Customer/CreateCustomer";
import ViewCustomer from "./components/Customer/ViewCustomer";
import ViewPurchase from "./components/Purchase/ViewPurchase";
import Signup from "./components/Signup";
import CreateSale from "./components/Sale/CreateSale";
import Salepdf from "./components/Sale/Salepdf";
import ViewSale from "./components/Sale/ViewSale";


function App() {
  
  return (
    <div className="App">
      <>
      <Routes>
         <Route path="/" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/pruchase/create" element={<Purchase/>}/>
         <Route path="/purchase/view" element={<ViewPurchase/>}/>
         <Route path="/sale/create" element={<CreateSale/>}/>
         <Route path="/sale/view" element={<ViewSale/>}/>
         <Route path="/item" element={<ItemForm/>}/>
         <Route path="/viewitem" element={<ViewItem/>}/>
         <Route path="/addcompany" element={<CompanyForm/>}/>
         <Route path="/createp" element={<CreatePurchase/>}/>
         <Route path="/customer/create" element={<CreateCustomer/>}/>
         <Route path="/customer/view" element={<ViewCustomer/>}/>
         <Route path="/edit/:companyId" element={<CompanyEditForm/>}/>
         <Route path="/pdf" element={<Printpdf />}/>
         <Route path="/salepdf" element={<Salepdf />}/>
      </Routes>
      <ToastContainer/>
      </>
    </div>
    
  );
}

export default App;
