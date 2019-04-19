# Excel-To-JSON
Convert Excel file to JSON and push it into MongoDB

==> First thing is to upload excel file using multer

==> Second thing is to do validate file whether it is in .xls or .xlsx format or not

==> Third thing is to save file in local system and take path name 

==> After getting path name, convert .xls or .xlsx format to json and insert documents into collection using insertMany method
