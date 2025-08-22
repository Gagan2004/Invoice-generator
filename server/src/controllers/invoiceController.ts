import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import puppeteer from 'puppeteer';
import { IUser } from '../models/User';

export const createInvoice = async (req: Request, res: Response) => {
  const { products } = req.body;
  // @ts-ignore
  const userId = req.user._id;

  try {
    const invoice = await Invoice.create({
      user: userId,
      products,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const generatePdf = async (req: Request, res: Response) => {
  const { products } = req.body;
  // @ts-ignore
  const user = req.user as IUser;

  const subTotal = products.reduce((acc: number, product: any) => acc + product.qty * product.rate, 0);
  const gst = subTotal * 0.18;
  const grandTotal = subTotal + gst;

 const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Generator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: white;
            color: #333;
            line-height: 1.4;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 0;
        }
        
        .invoice-container {
            background: white;
            max-width: 210mm;
            width: 100%;
            margin: 0 auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            min-height: 297mm;
            position: relative;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 30px 40px 20px 40px;
            border-bottom: 1px solid #e5e5e5;
        }
        
        .company-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo {
            width: 35px;
            height: 35px;
            background: #2c3e50;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
            position: relative;
        }
        
        .logo::before {
            content: '';
            width: 20px;
            height: 20px;
            background: white;
            transform: rotate(-45deg);
            clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        
        .company-details h2 {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
            margin: 0;
        }
        
        .company-details p {
            font-size: 12px;
            color: #666;
            margin: 2px 0 0 0;
        }
        
        .invoice-title {
            text-align: right;
        }
        
        .invoice-title h1 {
            font-size: 18px;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 5px 0;
            letter-spacing: 1px;
        }
        
        .invoice-subtitle {
            font-size: 11px;
            color: #666;
            margin: 0;
        }
        
        .client-section {
            background: linear-gradient(135deg, #4a5568, #2d3748);
            margin: 0 40px;
            border-radius: 12px;
            padding: 20px 25px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .client-info {
            flex: 1;
        }
        
        .client-label {
            font-size: 11px;
            color: rgba(255,255,255,0.8);
            margin-bottom: 5px;
        }
        
        .client-name {
            font-size: 16px;
            font-weight: 600;
            color: white;
        }
        
        .invoice-meta {
            text-align: right;
            flex: 1;
        }
        
        .meta-item {
            margin-bottom: 8px;
        }
        
        .meta-label {
            font-size: 11px;
            color: rgba(255,255,255,0.8);
        }
        
        .meta-value {
            font-size: 14px;
            font-weight: 500;
            color: white;
            background: rgba(255,255,255,0.15);
            padding: 4px 12px;
            border-radius: 15px;
            display: inline-block;
            margin-top: 2px;
        }
        
        .products-section {
            margin: 30px 40px;
        }
        
        .table-header {
            background: linear-gradient(135deg, #4a5568, #68d391);
            color: white;
            padding: 12px 20px;
            border-radius: 8px 8px 0 0;
            display: grid;
            grid-template-columns: 2fr 80px 80px 100px;
            gap: 15px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .table-header div:nth-child(2),
        .table-header div:nth-child(3),
        .table-header div:nth-child(4) {
            text-align: center;
        }
        
        .product-row {
            padding: 12px 20px;
            display: grid;
            grid-template-columns: 2fr 80px 80px 100px;
            gap: 15px;
            border-bottom: 1px solid #f0f0f0;
            background: white;
            font-size: 13px;
        }
        
        .product-row:last-child {
            border-bottom: none;
            border-radius: 0 0 8px 8px;
        }
        
        .product-name {
            color: #2c3e50;
            font-weight: 500;
        }
        
        .product-qty,
        .product-rate,
        .product-total {
            text-align: center;
            color: #666;
        }
        
        .product-total {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .products-table {
            background: #f8f9fa;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .summary-section {
            margin: 30px 40px;
            display: flex;
            justify-content: flex-end;
        }
        
        .summary-box {
            background: white;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 20px;
            min-width: 280px;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .summary-row:last-child {
            margin-bottom: 0;
            padding-top: 15px;
            border-top: 2px solid #e5e5e5;
            font-size: 16px;
            font-weight: 700;
        }
        
        .summary-label {
            color: #666;
        }
        
        .summary-value {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .total-amount {
            color: #3182ce !important;
            font-size: 18px !important;
        }
        
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #2d3748, #4a5568);
            color: white;
            padding: 20px 40px;
            text-align: center;
            font-size: 12px;
            line-height: 1.5;
            border-radius: 0 0 0 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .date-stamp {
            position: absolute;
            bottom: 15px;
            left: 40px;
            font-size: 11px;
            color: #999;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .invoice-container {
                box-shadow: none;
                min-height: auto;
            }
            
            .footer {
                position: relative;
                margin-top: 50px;
            }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="company-info">
                <div class="logo"></div>
                <div class="company-details">
                    <h2>Levitation</h2>
                    <p>Infotech</p>
                </div>
            </div>
            <div class="invoice-title">
                <h1>INVOICE GENERATOR</h1>
            </div>
        </div>
        
        <div class="client-section">
            <div class="client-info">
                <div class="client-label">Name</div>
                <div class="client-name">${user.name}</div>
            </div>
            <div class="invoice-meta">
                <div class="meta-item">
                    <div class="meta-label">Date: ${new Date().toLocaleDateString()}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-value">${user.email}</div>
                </div>
            </div>
        </div>
        
        <div class="products-section">
            <div class="products-table">
                <div class="table-header">
                    <div>Product</div>
                    <div>Qty</div>
                    <div>Rate</div>
                    <div>Total Amount</div>
                </div>
                
                ${products.map((p: any) => `
                  <div class="product-row">
                    <div class="product-name">${p.name}</div>
                    <div class="product-qty">${p.qty}</div>
                    <div class="product-rate">${p.rate.toFixed(2)}</div>
                    <div class="product-total">USD ${(p.qty * p.rate).toFixed(2)}</div>
                  </div>
                `).join('')}
            </div>
        </div>
        
        <div class="summary-section">
            <div class="summary-box">
                <div class="summary-row">
                    <div class="summary-label">Total Charges</div>
                    <div class="summary-value">$${subTotal.toFixed(2)}</div>
                </div>
                <div class="summary-row">
                    <div class="summary-label">GST (18%)</div>
                    <div class="summary-value">$${gst.toFixed(2)}</div>
                </div>
                <div class="summary-row">
                    <div class="summary-label">Total Amount</div>
                    <div class="summary-value total-amount">₹ ${grandTotal.toFixed(2)}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
        </div>
        
        <div class="date-stamp">Date: ${new Date().toLocaleDateString()}</div>
    </div>
</body>
</html>
`;

    try {
        console.log('Attempting to launch browser...');
        const browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--single-process',
            '--no-zygote'
          ],
          headless: true,
          executablePath:
            process.env.NODE_ENV === 'production'
              ? process.env.PUPPETEER_EXECUTABLE_PATH
              : puppeteer.executablePath()
        });
        console.log('Browser launched successfully.');
        
        console.log('Creating new page...');
        const page = await browser.newPage();
        console.log('Page created.');

        console.log('Setting HTML content...');
        await page.setContent(htmlContent);
        console.log('HTML content set.');

        console.log('Generating PDF...');
        const pdfBuffer = await page.pdf({ format: 'A4' });
        console.log('PDF generated.');

        console.log('Closing browser...');
        await browser.close();
        console.log('Browser closed.');

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': 'attachment; filename=invoice.pdf',
        });
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
};

