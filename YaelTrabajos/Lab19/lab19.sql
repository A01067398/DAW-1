SELECT SUM(e.cantidad) 'CANTIDAD TOTAL', 
	SUM(e.cantidad*m.precio + e.cantidad*m.precio*m.impuesto/100) 'IMPORTE TOTAL'
FROM entregan e
INNER JOIN materiales m ON m.clave = e.clave
WHERE YEAR(e.fecha) = 1997;

---------------------------------------------------------
CANTIDAD TOTAL	IMPORTE TOTAL
2860		1118484.475
---------------------------------------------------------

-- 2
SELECT p.razonsocial, COUNT(p.rfc) 'NUMERO DE ENTREGAS', SUM(m.precio * e.cantidad + m.precio * e.cantidad * m.impuesto/100) 'IMPORTE TOTAL' 
FROM proveedores p
INNER JOIN entregan e ON e.rfc = p.rfc
INNER JOIN materiales m ON m.clave = e.clave
GROUP BY p.razonsocial;

---------------------------------------------------------
razonsocial	NUMERO DE ENTREGAS	IMPORTE TOTAL
Alvin		10			579429.4530142022
Cecoferre	11			495450.55000000005
---------------------------------------------------------

-- 3
SELECT m.clave, m.descripcion, SUM(e.cantidad) 'CANT. TOTAL', 
MIN(e.cantidad) 'CANT. MINIMA', MAX(e.cantidad) 'CANT. MAXIMA', 
SUM(e.cantidad*m.precio + e.cantidad*m.precio*m.impuesto/100) 'IMPORTE TOTAL'
FROM materiales m
INNER JOIN entregan e ON e.clave = m.clave
GROUP BY m.clave, m.descripcion
HAVING AVG(e.cantidad) > 400;

---------------------------------------------------------
clave	descripcion	CANT. TOTAL	CANT. MINIMA	CANT. MAXIMA	IMPORTE TOTAL
1010	Varilla 4/32	1051		523		528		134764.475
1040	Varilla 3/18	803		263		540		149036.8
1050	Varilla 4/34	1126		503		623		231533.75

---------------------------------------------------------

-- 4
SELECT p.razonsocial, m.clave, m.descripcion, AVG(e.cantidad) 'CANT. PROMEDIO'
FROM proveedores p
INNER JOIN entregan e ON e.rfc = p.rfc
INNER JOIN materiales m ON m.clave = e.clave
GROUP BY p.razonsocial, m.clave, m.descripcion
HAVING AVG(e.cantidad) >= 500;

---------------------------------------------------------
razonsocial	clave	descripcion	CANT. PROMEDIO
Cecoferre	1270	Tezontle	526.0000
Comex		1050	Varilla 4/34	563.0000
La Ferre	1100	Block		582.5000
---------------------------------------------------------

-- 5
SELECT p.razonsocial, m.clave, m.descripcion, AVG(e.cantidad) CANT_PROMEDIO
FROM proveedores p
INNER JOIN entregan e ON e.rfc = p.rfc
INNER JOIN materiales m ON m.clave = e.clave
GROUP BY p.razonsocial, m.clave, m.descripcion
HAVING AVG(e.cantidad) < 370 OR AVG(e.cantidad) > 450
ORDER BY CANT_PROMEDIO ASC;

---------------------------------------------------------
razonsocial	clave	descripcion	CANT_PROMEDIO
Comex		1210	Recubrimiento P1028	56.5000
Oviedo		1170	Cantera amarilla	116.5000
Tubasa		1310	Tubería 3.6	135.5000
La fragua	1160	Cantera rosa	203.0000
Comex		1290	Tubería 3.5	205.5000
La fragua	1000	Varilla 3/16	209.5000
Alvin		1280	Tepetate	219.0000
Cecoferre	1190	Recubrimiento P1010	225.0000
Oviedo		1090	Ladrillos grises	247.0000
Cecoferre	1030	Varilla 4/33	248.5000
La fragua	1400	Pintura C1011	249.0000
Tubasa		1070	Varilla 4/35	252.5000
La fragua	1240	Arena	259.0000
Cecoferre	1350	Tubería 3.8	272.0000
Cecoferre	1430	Pintura B1022	294.5000
La Ferre	1020	Varilla 3/17	295.0000
Comex		1370	Pintura B1020	309.5000
Comex		1130	Sillar gris	312.5000
Alvin		1360	Pintura C1010	314.5000
Tabiquera del centro	1300	Tubería 4.3	320.0000
Oviedo		1330	Tubería 3.7	323.5000
Tabiquera del centro	1220	Recubrimiento P1037	341.0000
Cecoferre	1110	Megablock	352.5000
Alvin		1120	Sillar rosa	453.5000
Tubasa		1150	Cantera gris	455.5000
Tabiquera del centro	1380	Pintura C1011	473.5000
La Ferre	1340	Tubería 4.5	499.0000
Tabiquera del centro	1060	Varilla 3/19	508.0000
Oviedo		1010	Varilla 4/32	525.5000
Cecoferre	1270	Tezontle	526.0000
Oviedo		1410	Pintura B1021	534.0000
La Ferre	1260	Gravilla	545.5000
La fragua	1320	Tubería 4.4	555.5000
Comex		1050	Varilla 4/34	563.0000
La Ferre	1100	Block	582.5000
---------------------------------------------------------

-- 6
INSERT INTO materiales VALUES
(2000, 'Material 1', 'Descripcion 1', 100, 1),
(2001, 'Material 2', 'Descripcion 2', 200, 2),
(2002, 'Material 3', 'Descripcion 3', 300, 3),
(2003, 'Material 4', 'Descripcion 4', 400, 4),
(2004, 'Material 5', 'Descripcion 5', 500, 5);

-- 7
SELECT m.clave, m.descripcion
FROM materiales m
LEFT JOIN entregan e ON e.clave = m.clave
WHERE e.clave IS NULL;

---------------------------------------------------------
clave	descripcion
2000	Jabón
---------------------------------------------------------

-- 8
SELECT p.razonsocial
FROM proveedores p
INNER JOIN entregan e ON e.rfc = p.rfc
INNER JOIN proyectos pr ON pr.numero = e.numero
WHERE pr.denominacion = 'Vamos Mexico' AND pr.denominacion = 'Querétaro Limpio'
GROUP BY (p.razonsocial);

-- 9
SELECT m.descripcion
FROM entregan e
LEFT JOIN materiales m ON m.clave = e.clave
INNER JOIN proyectos pr ON pr.numero = e.numero
WHERE pr.denominacion <> 'CIT Yucatán';

---------------------------------------------------------
descripcion
Varilla 3/16
Recubrimiento P1019
Pintura C1011
---------------------------------------------------------

-- 10
SELECT p.razonsocial, AVG(e.cantidad) 'CANT. PROMEDIO'
FROM proveedores p
INNER JOIN entregan e ON e.rfc = p.rfc
GROUP BY p.razonsocial
HAVING AVG(e.cantidad) > (SELECT AVG(e1.cantidad) 
							FROM proveedores p1
                            INNER JOIN entregan e1 ON e1.rfc = p1.rfc
                            WHERE p1.rfc = 'VAGO780901'
                            );

-- 11
SELECT p.razonsocial
FROM proveedores p
INNER JOIN entregan e ON e.rfc = p.rfc
INNER JOIN proyectos pr ON pr.numero = e.numero
WHERE pr.denominacion = 'Infonavit Durango' AND 
	(SELECT SUM(e1.cantidad) 
    FROM proveedores p1 
    INNER JOIN entregan e1 ON e1.rfc = p1.rfc
    WHERE p1.rfc = p.rfc AND YEAR(e1.fecha) = 2000) 
    >
    (SELECT SUM(e1.cantidad) 
    FROM proveedores p1 
    INNER JOIN entregan e1 ON e1.rfc = p1.rfc
    WHERE p1.rfc = p.rfc AND YEAR(e1.fecha) = 2001)
GROUP BY p.razonsocial;

---------------------------------------------------------
razonsocial
Oviedo
Tabiquera del centro
---------------------------------------------------------
