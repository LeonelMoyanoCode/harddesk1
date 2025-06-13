import React, { useState, useEffect } from "react";
import axios from "axios";

export interface TableRowData {
  producto: string;
  precioDolar: number;
  precioPesos: number;
  precioGanancia: number;
  valorTotal: number;
}

export const CalculatorExcel: React.FC = () => {
  const [dolarBlue, setDolarBlue] = useState<number>(0);
  const [data, setData] = useState<TableRowData[]>([
    {
      producto: "Producto A",
      precioDolar: 0,
      precioPesos: 0,
      precioGanancia: 0,
      valorTotal: 0,
    },
  ]);

  // Obtener el valor del dólar blue de la API
  useEffect(() => {
    axios
      .get("https://dolarapi.com/v1/dolares/blue")
      .then((response) => {
        const valorDolarBlue = parseFloat(response.data.venta);
        if (!isNaN(valorDolarBlue) && valorDolarBlue > 0) {
          setDolarBlue(valorDolarBlue);
        } else {
          console.error("Error: El valor del dólar no es válido.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el valor del dólar:", error);
      });
  }, []);

  // Actualizar automáticamente los cálculos al cambiar el valor del dólar
  useEffect(() => {
    const updatedData = data.map((row) => {
      const precioPesos = row.precioDolar * dolarBlue;
      const valorTotal = precioPesos + row.precioGanancia;
      return {
        ...row,
        precioPesos,
        valorTotal,
      };
    });
    setData(updatedData);
  }, [dolarBlue, data]);

  // Función para actualizar una fila de la tabla
  const updateRow = (
    index: number,
    field: keyof TableRowData,
    value: string | number
  ) => {
    const updatedData = [...data];
    if (field === "producto" && typeof value === "string") {
      updatedData[index][field] = value;
    } else if (typeof value === "number" && (field === "precioDolar" || field === "precioGanancia")) {
      updatedData[index][field] = value;
    }

    // Calcular precios actualizados
    const precioPesos = updatedData[index].precioDolar * dolarBlue;
    const valorTotal = precioPesos + updatedData[index].precioGanancia;
    updatedData[index].precioPesos = precioPesos;
    updatedData[index].valorTotal = valorTotal;

    setData(updatedData);
  };

  // Añadir nueva fila
  const addRow = () => {
    setData([
      ...data,
      {
        producto: "",
        precioDolar: 0,
        precioPesos: 0,
        precioGanancia: 0,
        valorTotal: 0,
      },
    ]);
  };

  // Borrar fila
  const deleteRow = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Calculadora de Precios</h1>
        <p className="mb-4">Valor del dólar blue: <span className="font-bold text-blue-500">{dolarBlue}</span></p>

        <table className="w-full border-collapse border border-gray-200 mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-2 text-left font-semibold">Producto</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Precio Dólar</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Precio Pesos</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Ganancia</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Valor Total</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2">
                  <input
                    type="text"
                    value={row.producto}
                    onChange={(e) => updateRow(index, "producto", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <input
                    type="number"
                    value={row.precioDolar}
                    onChange={(e) => updateRow(index, "precioDolar", parseFloat(e.target.value))}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <input
                    type="number"
                    value={row.precioPesos}
                    className="border rounded p-1 w-full"
                    disabled
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <input
                    type="number"
                    value={row.precioGanancia}
                    onChange={(e) => updateRow(index, "precioGanancia", parseFloat(e.target.value))}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <span className="text-green-500 font-bold">{row.valorTotal.toFixed(2)}</span>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <button
                    onClick={() => deleteRow(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addRow}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Agregar Fila
        </button>
      </div>
    </div>
  );
};
