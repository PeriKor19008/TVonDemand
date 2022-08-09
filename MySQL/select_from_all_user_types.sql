SELECT count(*) AS Found, 'Customer' AS Type FROM customer WHERE email='?' UNION
SELECT count(*) AS Found, 'Employee' AS Type FROM employee WHERE email='?' UNION
SELECT count(*) AS Found, 'Administrator' AS Type FROM administrator WHERE email='?'
ORDER BY Found DESC LIMIT 0,1;
