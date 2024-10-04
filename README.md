PDF Generator in Node.js
This is a simple PDF generator built with Node.js that allows you to create a PDF with a predefined structure and format. You can easily modify the structure to suit your specific needs.

Features
Generate PDF documents from JSON data.
Customizable design and format.
Easy to use and integrate.
Getting Started
Prerequisites
Make sure you have Node.js installed. If not, you can download it from Node.js official website.

Installation
Clone the repository:

bash
Copy code
git clone <https://github.com/DawoodIsrar/PdfGenerator_Nodejs.git>
Navigate to the project directory:

bash
Copy code
cd PdfGenerator_Nodejs
Install the necessary dependencies:

bash
Copy code
npm install
Running the Application
Start the Node.js server:

bash
Copy code
node server
Open your browser and visit:

bash
Copy code
http://localhost:8080/generate-pdf
You can send a JSON payload with the following structure to generate the PDF:

json
Copy code
{
"contractorName": "XYZ Transport",
"address": "1234 Main, USA",
"companyEmail": "contact@xyztransport.com",
"phoneNo": "555-123-4567",
"countryName": "United States",
"corpCode": "C1234",
"schoolName": "ABC School",
"code": "S1234",
"schCode": "SC1234",
"terminalId": "T123",
"teamId": "Te123",
"date": "2024-10-03",
"page": "01",
"of": "30",
"drivers": [
{
"lastName": "Dawood",
"firstName": "Israr",
"mI": "mi",
"licenseNumber": "A1",
"expirationDate": "20",
"type": "A",
"endr": "V",
"restr": "N",
"medicalReport": "V",
"_70": "Y",
"_75": "Y",
"fingerPrints": "Y",
"dlComments": "No"
},
{
"lastName": "Dawood",
"firstName": "Israr",
"licenseNumber": "A1",
"expirationDate": "20",
"type": "A",
"endr": "V",
"restr": "N",
"medicalReport": "V",
"_70": "Y",
"_75": "Y",
"fingerPrints": "Y",
"dlComments": "No"
},
{
"lastName": "Dawood",
"firstName": "Israr",
"licenseNumber": "A1",
"expirationDate": "20",
"type": "A",
"endr": "V",
"restr": "N",
"medicalReport": "V",
"_70": "Y",
"_75": "Y",
"fingerPrints": "Y",
"dlComments": "dl comments dl comments dl comments"
}
]
}
Customization
You can modify the PDF structure and design by editing the code in server.js according to your desired format.
