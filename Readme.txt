{/*------- ERP SYSTEM ---------*/}

Front End-> React & TypeScript
Back End -> C# .net Core
Database -> MySQL

{/*------- Setup ---------*/}

* SQL Server:

1) Setup and upload the csv file in the database
2) Two Tables are created for database
3) Im using "erpsystem" as database name.
4) Table "bom" & "parts" should be created and populated with data.

* Frontend:

1) ./frontend
2) Terminal Command-> npm i
3) Terminal Command-> npm run dev

Frontend Starts at: http://localhost:5173

* Backend:

1) ./backend

2) Change the SQL connection string at appsettings.json at your application: (according to your SQL/database setup)

	"ConnectionStrings": {
        "ERPSysConn": "Server=localhost;Database=erpsystem;User=root;Password=Admin123;"
    },

3) Start Startup.cs file inside ERPSystem

Backend URL: http://localhost:61758/api/bom ||  http://localhost:61758/api/bom
Note: Since this application is currently using Localhost, Backend port may varied according to the network and system, please start the backend and change the .env file in the frontend as well

4) Change the Backend PORT and URL at .env file url in the frontend:
	EX:
		VITE_COREAPI_URL=http://localhost:61758 
