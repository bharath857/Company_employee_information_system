      Problem 1 -
      A company-employee information system (API only) :-


● Admin only authenticated application. Only someone with admin credentials can perform
any action in this application.
● Create, update and manage company information
● Create, update and manage employee information
● Each employee is part of some company and has a reporting manager in the company.
● Search employee within a company, by his name, employee id or phone number
● Given an employee ID in a company list all his subordinates and who is his reporting
  manager.

      Stack/Tools to use -
● Postman
● Node JS
● MongoDB

Step 1:-	Run Npm Install to het all dependicies</br>
Step 2:-	Initialize or start the local monfgo db server</br>
Step 3:-	Start the app with nodemon or node by command npm run dev</br>
Step 4:-	Open postman</br>
Step 5:-	Add request with  POST:- Localhost/Employees    with body as given in initial data given in project</br>
Step 6:-	Add request with  POST:- Localhost/Employees/login    with name and password –You will get new item in postman called token as responce</br>
Step 7:-	Add request with  GET:- Localhost/myProfile  in header part in postman give KEY:-”Authorization”, value:- Token we got in login</br>
Step 8:-	You will get your profile information</br>
Step 9:-	Repeart only STEP 5 for multiple data</br>
Step 10:-	Add request with  GET:- Localhost/listallEmployees  with will give all the employes/ data in givem database</br>
Step 11:-	Add request with  POST:- Localhost//Employees/logout this will logut particular user/token</br>
