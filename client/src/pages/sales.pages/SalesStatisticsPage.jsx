import { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { getAllInvoiceOrders } from "../../api/sales";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";

const SalesStatisticsPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { user } = useAuth();

  let list = [];
  if (user.role === "ADMINISTRADOR") {
    list = [
      {
        title: "Volver",
        url: "/admin/sales",
        icon: "bi bi-arrow-left-circle-fill",
      },
      { title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" },
    ];
  } else {
    list = [
      { title: "Home", url: "/client/home", icon: "bi bi-house-fill" },
      { title: "Tienda", url: "/client/catalog", icon: "bi bi-shop" },
      { title: "Carrito", url: "/client/checkout", icon: "bi bi-cart-fill" },
    ];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllInvoiceOrders();
        setInvoices(response.data.invoiceOrders);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Chart.controllers && Chart.controllers.bar) {
      Chart.register({
        id: "category",
        beforeInit: function (chart) {
          const scale = chart.scales["x-axis-0"];
          if (scale) {
            scale.options.type = "category";
          }
        },
      });
    }
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const getSalesData = () => {
    const filteredInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.Date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        invoiceDate >= start &&
        invoiceDate <= new Date(end.getTime() + 24 * 60 * 60 * 1000)
      );
    });

    const salesData = {};

    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const dateKey = currentDate.toISOString().split("T")[0];
      const salesCount = filteredInvoices.filter(
        (invoice) => invoice.Date.split("T")[0] === dateKey
      ).length;
      salesData[dateKey] = salesCount;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return salesData;
  };

  const getPieChartDataLineaCaja = () => {
    const filteredInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.Date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        invoiceDate >= start &&
        invoiceDate <= new Date(end.getTime() + 24 * 60 * 60 * 1000)
      );
    });

    const salesLinea = filteredInvoices.filter(
      (invoice) => invoice.PayMethod === "LINEA"
    ).length;
    const salesCaja = filteredInvoices.filter(
      (invoice) => invoice.PayMethod === "CAJA"
    ).length;

    return {
      labels: [
        `Ventas en línea (${salesLinea}) - ${(
          (salesLinea / (salesLinea + salesCaja)) *
          100
        ).toFixed(2)}%`,
        `Ventas en caja (${salesCaja}) - ${(
          (salesCaja / (salesLinea + salesCaja)) *
          100
        ).toFixed(2)}%`,
      ],
      datasets: [
        {
          label: "Cantidad de Ventas",
          data: [salesLinea, salesCaja],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };
  };

  const getPieChartDataDescuento = () => {
    const filteredInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.Date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        invoiceDate >= start &&
        invoiceDate <= new Date(end.getTime() + 24 * 60 * 60 * 1000)
      );
    });

    const salesWithDiscount = filteredInvoices.filter(
      (invoice) => invoice.Discount > 0
    ).length;
    const salesWithoutDiscount = filteredInvoices.length - salesWithDiscount;

    return {
      labels: [
        `Con Descuento (${salesWithDiscount}) - (${Math.round(
          (salesWithDiscount / filteredInvoices.length) * 100
        )}%)`,
        `Sin Descuento (${salesWithoutDiscount}) - (${Math.round(
          (salesWithoutDiscount / filteredInvoices.length) * 100
        )}%)`,
      ],
      datasets: [
        {
          label: "Cantidad de Ventas",
          data: [salesWithDiscount, salesWithoutDiscount],
          backgroundColor: ["#FFCE56", "#96ceb4"],
        },
      ],
    };
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  const barOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          source: "data",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const totalSalesInRange =
    Object.values(getSalesData()).reduce((a, b) => a + b, 0) || 0;

  return (
    <>
      <div className="container mt-4 mb-4 pt-4 pb-4 bg-white rounded-4  text-center">
        <div className="container mt-4 mb-4">
          <h2 className="text-center mb-4">Estadísticas de Ventas</h2>
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="row align-items-center">
                <div className="col">
                  <label htmlFor="startDate" className="form-label">
                    Fecha de Inicio:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="endDate" className="form-label">
                    Fecha Final:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <h6>Total de ventas en el rango de fechas: {totalSalesInRange}</h6>

          <div className="row">
            <div className="col-md-12">
              <div className="row mb-3"></div>
              <hr />
              <h3 className="text-center mb-3">Ventas Diarias</h3>
              <Bar
                data={{
                  labels: Object.keys(getSalesData()),
                  datasets: [{ data: Object.values(getSalesData()) }],
                }}
                options={barOptions}
              />
              <br />
              <br />
              <hr />

              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ overflowX: "auto", overflowY: "hidden" }}
                  >
                    <hr />
                    <h3 className="text-center mb-3">
                      Ventas en Línea vs. Ventas en Caja
                    </h3>
                    <div className="mb-4">
                      <Doughnut
                        data={getPieChartDataLineaCaja()}
                        options={pieOptions}
                        style={{ width: "400px", height: "400px" }}
                      />
                    </div>
                    <hr />
                    <h3 className="text-center mb-3">
                      Ventas con Descuento vs. Ventas sin Descuento
                    </h3>
                    <div>
                      <Doughnut
                        data={getPieChartDataDescuento()}
                        options={pieOptions}
                        style={{ width: "400px", height: "400px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation list={list} />
    </>
  );
};

export default SalesStatisticsPage;
