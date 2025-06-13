import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "../pages/HomePage";
import { CellPhonesPage } from "../pages/CellPhonesPage";
import { About } from "../pages/About";
import { CalculatorExcel } from "../pages/CalculatorExcel";
import { CellPhonePage } from "../pages/CellPhonePage";
import { CalculadorProductos } from "../pages/CalculadorProductos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Define la página principal ("/")
        element: <HomePage />,
      },
      {
        path: "celulares", // Ruta relativa para "/celulares"
        element: <CellPhonesPage />, // Componente que se renderiza en "/celulares"
      },
      {
        path: "celulares/:slug",
        element: <CellPhonePage />,
      },
      {
        path: "nosotros", // Ruta relativa para "/celulares"
        element: <About />, // Componente que se renderiza en "/celulares"
      },

      {
        path: "calculadora", // Ruta relativa para "/celulares"
        element: <CalculatorExcel />, // Componente que se renderiza en "/celulares"
      },
      {
        path: "calculadoraiphone", // Ruta relativa para "/celulares"
        element: <CalculadorProductos />, // Componente que se renderiza en "/celulares"
      },
    ],
  },
]);
