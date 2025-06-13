import React, { useState, useEffect } from "react";
import axios from "axios";

export interface TableRowData {
  producto: string;
  precioDolar: number;
  precioPesos: number;
  envio: number;
  impuestos: number; // Porcentaje de impuestos
  ganancia: number;  // Porcentaje de ganancia
  precioFinal: number; // Precio Final calculado
}

export const CalculadorProductos: React.FC = () => {
  const [dolarBlue, setDolarBlue] = useState<number>(0);
  const [data, setData] = useState<TableRowData[]>([
    {
      producto: "Producto A",
      precioDolar: 0,
      precioPesos: 0,
      envio: 0,
      impuestos: 0, // Porcentaje de impuestos
      ganancia: 0, // Porcentaje de ganancia
      precioFinal: 0, // Inicializamos con 0
    },
  ]);

  // Obtener el valor del dolar blue de la API
  useEffect(() => {
    axios
      .get("https://dolarapi.com/v1/dolares/blue")
      .then((response) => {
        const valorDolarBlue = parseFloat(response.data.venta); // Usamos "venta" como el valor a tomar
        if (!isNaN(valorDolarBlue) && valorDolarBlue !== 0) {
          // Validar que el valor sea distinto de 0 y tenga hasta 4 dígitos
          if (valorDolarBlue >= 1 && valorDolarBlue <= 9999) {
            setDolarBlue(valorDolarBlue);
          } else {
            console.error("El valor del dólar no está dentro del rango esperado.");
          }
        } else {
          console.error("Error: El valor del dólar no es un número válido o es 0.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el valor del dólar:", error);
      });
  }, []);

  // Función para actualizar la fila de la tabla
  const updateRow = (
    index: number,
    field: keyof TableRowData, // Aseguramos que 'field' es una clave válida de TableRowData
    value: string | number
  ) => {
    const updatedData = [...data];

    // Comprobación de tipo para asegurar que el valor sea correcto según el campo
    if (typeof value === "string" && field === "producto") {
      updatedData[index][field] = value;
    } else if (typeof value === "number" && 
               (field === "precioDolar" || field === "precioPesos" || field === "envio" || field === "impuestos" || field === "ganancia")) {
      updatedData[index][field] = value;
    }

    // Asegúrate de que dolarBlue es un número válido
    const precioDolar = updatedData[index].precioDolar;
    const conversionDolar = dolarBlue > 0 ? dolarBlue : 1; // Usa dolarBlue si es válido, de lo contrario no haces la conversión

    // Calcular el precio en pesos usando la conversión correcta
    updatedData[index].precioPesos = precioDolar * conversionDolar;

    // Recalcular el precio final con impuestos y ganancia
    updatedData[index].precioFinal = calculatePrecioFinal(updatedData[index]);

    // Actualizar los datos
    setData(updatedData);
  };

  // Calcular el precio final con impuestos y ganancia
  const calculatePrecioFinal = (row: TableRowData): number => {
    const precioConEnvio = row.precioPesos + (row.envio || 0); // Si falta el envío, se asume 0
    const impuestosCalculados = (precioConEnvio * (row.impuestos || 0)) / 100; // Si faltan impuestos, se asume 0
    const gananciaCalculada = (precioConEnvio * (row.ganancia || 0)) / 100; // Si falta ganancia, se asume 0

    return precioConEnvio + impuestosCalculados + gananciaCalculada; // Precio final
  };

  // Añadir nueva fila
  const addRow = () => {
    setData([
      ...data,
      {
        producto: "",
        precioDolar: 0,
        precioPesos: 0,
        envio: 0,
        impuestos: 0, // Inicializamos con 0
        ganancia: 0,  // Inicializamos con 0
        precioFinal: 0, // Inicializamos con 0
      },
    ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Calculadora de Precios - Simulador Excel</h1>

        <table className="w-full border-collapse border border-gray-200 mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-2 text-left font-semibold">Producto</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Precio Dólar</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Precio Pesos</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Envío</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Impuestos (%)</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Ganancia (%)</th>
              <th className="border border-gray-200 p-2 text-left font-semibold">Precio Final</th>
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
                    onChange={(e) => updateRow(index, "precioPesos", parseFloat(e.target.value))}
                    className="border rounded p-1 w-full"
                    disabled
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <input
                    type="number"
                    value={row.envio}
                    onChange={(e) => updateRow(index, "envio", parseFloat(e.target.value))}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <input
                    type="number"
                    value={row.impuestos}
                    onChange={(e) => updateRow(index, "impuestos", Math.min(parseFloat(e.target.value), 99))}
                    className="border rounded p-1 w-full"
                    max={99}
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <input
                    type="number"
                    value={row.ganancia}
                    onChange={(e) => updateRow(index, "ganancia", Math.min(parseFloat(e.target.value), 99))}
                    className="border rounded p-1 w-full"
                    max={99}
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <span className="text-green-500 font-bold">{row.precioFinal.toFixed(2)}</span>
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
