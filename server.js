const express = require("express");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const app = express();
const PORT = 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Function to create the PDF with the necessary structure
async function createPdf(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([850, 650]);

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBoldFont = await pdfDoc.embedFont(
    StandardFonts.TimesRomanBold
  );
  const headerFontSize = 8; // Adjusted header font size
  const fontSize = 8; // Regular font size
  const lineHeight = 12; // Line height for spacing
  let yPos = 650;
  const colorThinkness = {
    color: rgb(0, 0, 0),
    thickness: 1,
  };
  const style = {
    height: headerFontSize + 5,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  };

  page.drawRectangle({
    x: 20, // X-coordinate for the left border
    y: 16, // Y-coordinate for the bottom border
    width: 810, // Width for the border (page width - padding)
    height: 610, // Height for the border (page height - padding)
    borderColor: rgb(0, 0, 0),
    borderWidth: 2, // Thickness of the border
  });

  const imagePath = fs.readFileSync("./assets/logo.png"); // Load the image file
  const embeddedImage = await pdfDoc.embedPng(imagePath); // Embed the image (use embedJpg if it’s a JPG)

  // Define image dimensions
  const imageWidth = 30;
  const imageHeight = 30;

  // Draw the image at a specific position (adjust x and y)
  page.drawImage(embeddedImage, {
    x: 40, // Adjust X position
    y: yPos - 60, // Adjust Y position
    width: imageWidth,
    height: imageHeight,
  });

  page.drawText("New Jersey", {
    x: 70,
    y: yPos - 42,
    size: 16,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPos -= 20;
  page.drawText("Motor Vehicle Commission", {
    x: 70,
    y: yPos - 38,
    size: 16,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  // Title
  page.drawText("School Bus Driver Certification Roster", {
    x: 300,
    y: yPos - 20,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`PAGE:   ${data.page || "N/A"}`, {
    x: 730,
    y: yPos - 20,
    size: 8,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: 757, y: yPos - 22 },
    end: { x: 775, y: yPos - 22 }, // Adjust length as needed
    ...colorThinkness,
  });
  page.drawText(`OF   ${data.of || "N/A"}`, {
    x: 777,
    y: yPos - 20,
    size: 8,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: 792, y: yPos - 22 },
    end: { x: 810, y: yPos - 22 }, // Adjust length as needed
    ...colorThinkness,
  });

  page.drawText(`DATE:   ${data.date || "N/A"}`, {
    x: 730,
    y: yPos - 40,
    size: 8,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: 757, y: yPos - 44 },
    end: { x: 800, y: yPos - 44 }, // Adjust length as needed
    ...colorThinkness,
  });
  yPos -= 70;

  // Drawing company and school information in rows
  // First Row
  const firstRowItems = [
    `Contractor Name: ${data.contractorName || "N/A"}`,
    `Address: ${data.address || "N/A"}`,
    `Comapny`,
    `Phone No: ${data.phoneNo || "N/A"}`,
  ];

  const firstRowXPositions = [20, 200, 400, 600];

  firstRowItems.forEach((item, index) => {
    const x = firstRowXPositions[index];

    if (index === 2) {
      page.drawText(item, {
        x,
        y: yPos,
        size: fontSize,
      });
    } else {
      page.drawText(item, {
        x: x + 5,
        y: yPos - 10,
        size: fontSize,
      });
    }

    // Draw underline for each item
    const underlineYPos = yPos - 2; // Position for the underline

    if (index === 2) {
      page.drawLine({
        start: { x: x + 55, y: underlineYPos - 12 },
        end: { x: x + 150, y: underlineYPos - 12 }, // Adjust length as needed
        ...colorThinkness,
      });
    } else if (index === 1) {
      page.drawLine({
        start: { x: x + 40, y: underlineYPos - 10 },
        end: { x: x + 140, y: underlineYPos - 10 }, // Adjust length as needed
        ...colorThinkness,
      });
    } else if (index === 0) {
      page.drawLine({
        start: { x: x + 70, y: underlineYPos - 10 },
        end: { x: x + 140, y: underlineYPos - 10 }, // Adjust length as needed
        ...colorThinkness,
      });
    } else {
      page.drawLine({
        start: { x: x + 45, y: underlineYPos - 10 },
        end: { x: x + 140, y: underlineYPos - 10 }, // Adjust length as needed
        ...colorThinkness,
      });
    }
  });
  yPos -= lineHeight + 15;

  page.drawText(`Email Address: ${data.companyEmail || "N/A"}`, {
    x: 400,
    y: yPos + 16,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Second Row
  const secondRowItems = [
    `Country: ${data.countryName || "N/A"}`,
    `Corp. Code: ${data.corpCode || "N/A"}`,
    `District/Private School Name: ${data.schoolName || "N/A"}`,
    `Code: ${data.code || "N/A"}`,
    `Code: ${data.schCode || "N/A"}`,
    `Terminal ID: ${data.terminalId || "N/A"}`,
    `Team No: ${data.teamId || "N/A"}`,
  ];

  const secondRowXPositions = [20, 120, 220, 400, 460, 600, 700];

  secondRowItems.forEach((item, index) => {
    const x = secondRowXPositions[index];
    const y = yPos;
    const heightBorder = {
      height: headerFontSize + 15,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    };
    page.drawText(item, {
      x: x + 5,
      y,
      size: fontSize,
    });
    if (index === 2) {
      // Draw full border for each item
      page.drawRectangle({
        x,
        y: y - 14,
        width: 180, // Adjust based on text length
        ...heightBorder,
      });
    } else if (index === 3 || index === 4) {
      // Draw full border for each item
      page.drawRectangle({
        x,
        y: y - 14,
        width: 60, // Adjust based on text length
        ...heightBorder,
      });
    } else if (index === 0 || index === 1 || index === 2) {
      page.drawRectangle({
        x,
        y: y - 14,
        width: 100, // Adjust based on text length
        ...heightBorder,
      });
    } else if (index === 5) {
      page.drawLine({
        start: { x: x + 50, y: y - 2 },
        end: { x: x + 100, y: y - 2 }, // Adjust length as needed
        ...colorThinkness,
      });
    } else if (index === 6) {
      page.drawLine({
        start: { x: x + 45, y: y - 2 },
        end: { x: x + 100, y: y - 2 }, // Adjust length as needed
        ...colorThinkness,
      });
    }
  });

  yPos -= lineHeight + 20; // Adjust position after the second row

  // Table Headers for drivers' details with borders
  const headerYPos = yPos; // Store header position
  const headers = [
    "Last Name:",
    "First Name:",
    "M.i.",
    "Driver's License No",
    "Exp. Date:",
    "Type:",
    "Endr:",
    "Restr:",
    "Medical Rpt:",
    "70",
    "75",
    "Finger Prints",
    "D/L Comments:",
  ];

  const headerXPositions = [
    40, 120, 185, 205, 285, 340, 380, 420, 465, 525, 545, 570, 700,
  ]; // X positions for each header

  // Draw the headers with borders
  headers.forEach((header, index) => {
    const x = headerXPositions[index];
    page.drawText(header, {
      x,
      y: headerYPos,
      size: 8,
      font: timesRomanBoldFont,
    });
  });

  yPos -= lineHeight;

  // Loop through drivers and display their details in table rows
  if (Array.isArray(data.drivers) && data.drivers.length > 0) {
    data.drivers.forEach((driver) => {
      page.drawText(`${driver.lastName}`, { x: 25, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 20,
        y: yPos + 5 - headerFontSize,
        width: 80,
        ...style,
      });
      page.drawText(`${driver.firstName}`, { x: 105, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 100,
        y: yPos + 5 - headerFontSize,
        width: 80,
        ...style,
      });

      page.drawText(`${driver.mI || "N/A"}`, {
        x: 185,
        y: yPos,
        size: fontSize,
      });
      page.drawRectangle({
        x: 180,
        y: yPos + 5 - headerFontSize,
        width: 20,
        ...style,
      });
      page.drawText(`${driver.licenseNumber}`, {
        x: 205,
        y: yPos,
        size: fontSize,
      });
      page.drawRectangle({
        x: 200,
        y: yPos + 5 - headerFontSize,
        width: 80,
        ...style,
      });
      page.drawText(`${driver.expirationDate}`, {
        x: 285,
        y: yPos,
        size: fontSize,
      });
      page.drawRectangle({
        x: 280,
        y: yPos + 5 - headerFontSize,
        width: 50,
        ...style,
      });
      page.drawText(`${driver.type}`, { x: 335, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 330,
        y: yPos + 5 - headerFontSize,
        width: 40,
        ...style,
      });

      page.drawText(`${driver.endr}`, { x: 375, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 370,
        y: yPos + 5 - headerFontSize,
        width: 40,
        ...style,
      });
      page.drawText(`${driver.restr}`, { x: 415, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 410,
        y: yPos + 5 - headerFontSize,
        width: 40,
        ...style,
      });
      page.drawText(`${driver.medicalReport}`, {
        x: 455,
        y: yPos,
        size: fontSize,
      });
      page.drawRectangle({
        x: 450,
        y: yPos + 5 - headerFontSize,
        width: 70,
        ...style,
      });
      page.drawText(`${driver._70}`, { x: 525, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 520,
        y: yPos + 5 - headerFontSize,
        width: 20,
        ...style,
      });
      page.drawText(`${driver._75}`, { x: 545, y: yPos, size: fontSize });
      page.drawRectangle({
        x: 540,
        y: yPos + 5 - headerFontSize,
        width: 20,
        ...style,
      });
      page.drawText(`${driver.fingerPrints}`, {
        x: 565,
        y: yPos,
        size: fontSize,
      });
      page.drawRectangle({
        x: 560,
        y: yPos + 5 - headerFontSize,
        width: 70,
        ...style,
      });
      page.drawText(`${driver.dlComments}`, {
        x: 635,
        y: yPos,
        size: fontSize,
      });
      page.drawRectangle({
        x: 630,
        y: yPos + 5 - headerFontSize,
        width: 199,
        ...style,
      });
      yPos -= lineHeight + 1;
    });
  } else {
    page.drawText("No drivers available.", { x: 50, y: yPos, size: fontSize });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Endpoint to generate the PDF
app.post("/generate-pdf", async (req, res) => {
  try {
    const data = req.body;
    const pdfBytes = await createPdf(data);

    // Set response headers to download the file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=School_Bus_Driver_Certification_Roster.pdf"
    );

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
