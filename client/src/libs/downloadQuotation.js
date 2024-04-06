import html2pdf from "html2pdf.js";

const downloadQuotation = ({
  productList,
  discount,
  subtotal,
  total,
  userName,
  email,
}) => {
  const buildQuotationHTML = () => {
    let count = 0;

    const itemsHTML = productList
      .map((item) => {
        const itemISV = (
          item.price * item.quantity -
          (item.price * item.quantity) / 1.15
        ).toFixed(2);

        count += parseFloat(itemISV);

        return `
                    <tr class="item">
                        <td>${item.title}</td>
                        <td>${item.quantity}</td>
                        <td>${((item.price * item.quantity) / 1.15).toFixed(
                          2
                        )}</td>
                        <td>${itemISV}</td>
                        <td><b>$${(item.price * item.quantity).toFixed(
                          2
                        )}</b></td>
                    </tr>
                `;
      })
      .join("");

    const quotationHTML = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Cotización</title>
                    <style>
                        .quotation-font {
                            font-family: Arial, sans-serif;
                            color: #333;
                        }
                        .quotation-box {
                            max-width: 800px;
                            margin: auto;
                            padding: 20px;
                        }
                        .watermark {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%) rotate(-45deg);
                            color: rgba(0, 0, 0, 0.1);
                            font-size: 100px;
                            font-weight: bold;
                            z-index: 100;
                        }
                        .quotation-title {
                            text-align: center;
                            font-size: 30px;
                        }
                        .quotation-box .information td {
                            padding-bottom: 40px;
                        }
                        .quotation-box table {
                            width: 100%;
                            line-height: inherit;
                            text-align: left;
                            border-collapse: collapse;
                        }
                        .quotation-box th, .quotation-box td {
                            border-bottom: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        .quotation-box tr:nth-child(even) {
                            background-color: #f2f2f2;
                        }
                        .quotation-box tr.heading td {
                            background-color: #eee;
                        }
                        .quotation-box .item td {
                            background-color: #fff;
                            border-bottom: 1px solid #eee;
                        }
                        .quotation-box .item.last td {
                            border-bottom: none;
                        }
                        .quotation-box .details td {
                            padding-bottom: 20px;
                        }
                        .quotation-box .item-heading {
                            background-color: #eee;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body class="quotation-font">
                    <div class="quotation-box">
                        <div class="watermark">COTIZACIÓN COTIZACIÓN COTIZACIÓN COTIZACIÓN COTIZACIÓN</div>
                        <div class="quotation-title">Cotización</div>
                        <div style="text-align: center;">
                            <img src="../../public/logo-horizontal.png" alt="Company logo"
                                 style="max-width: 500px; height: auto; filter: grayscale(100%);" />
                        </div>
                        <table class="information">
                            <tr>
                                <td style="text-align: left;">
                                    Av. Siempre Viva 742<br />
                                    Springfield
                                </td>
                                <td style="text-align: right;">
                                    Usuario: ${userName}<br />
                                    Email: ${email}
                                </td>
                            </tr>
                        </table>
                        <table class="details">
                            <tr class="item-heading">
                                <td>Item</td>
                                <td>Cantidad</td>
                                <td>Precio</td>
                                <td>ISV</td>
                                <td>Precio Total</td>
                            </tr>
                            ${itemsHTML}
                            <tr class="item-heading">
                                <td>Detalles</td>
                            </tr>
                            <tr class="item">
                                <td colspan="4">ISV 15%:</td>
                                <td>${count.toFixed(2)}</td>
                            </tr>
                            <tr class="item">
                                <td colspan="4">Descuento:</td>
                                <td>${discount}</td>
                            </tr>
                            <tr class="item">
                                <td colspan="4">Subtotal:</td>
                                <td>${subtotal}</td>
                            </tr>
                            <tr class="item">
                                <td colspan="4"><b>Total:</b></td>
                                <td><b>$${total}</b></td>
                            </tr>
                        </table>
                    </div>
                </body>
            </html>
        `;
    return quotationHTML;
  };

  const downloadPDF = () => {
    const quotationHTML = buildQuotationHTML();
    const now = new Date();
    const filename = `cotizacion_${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(
        2,
        "0"
      )}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.pdf`;

    const options = {
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(quotationHTML).set(options).save();
  };

  downloadPDF();
};

export default downloadQuotation;
