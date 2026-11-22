ctAccount
	q

pRegister
	i '($d(httpreq("json","email"))&$d(httpreq("json","password"))) d setError^%ydbwebutils(400,"Bad Request") q
	
	n registerForm m registerForm=httpreq("json")
	
	i '(registerForm("email")?1.32AN1"@"1.3(1.32AN1".")1.32AN) d setError^%ydbwebutils(400,"Введен некорректный email") q
	i '(registerForm("email")?8.32E) d setError^%ydbwebutils(400,"Введен некорректный пароль") q
	
	
	s httprsp("request","email")=registerForm("email")
	s httprsp("request","password")=registerForm("password")
	s httprsp("success")="true"
	s httprsp("datetime1")=$h
	s httprsp("datetime2")=$zd($h,"DD.MM.YYYY 24:60:SS")
	;s httprsp("header","Set-Cookie")="msg=Hello, World!; Path=/; HttpOnly;"
	
	q

pPasswordRecover
	q

pPasswordChange
	q