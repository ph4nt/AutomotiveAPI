# AutomotiveAPI

Diese Schnittstelle ist für Spiele- bzw. Anwendungsentwickler gedacht, um Daten eines Automobils in geeigneter Form über eine REST-Schnitstelle hochzuladen und auf der anderen Seite Klienten möglichst in Echtzeit mit diesen neuen Informationen zu versorgen.

## Allgemeines Setup der API

### Schritt 1: Redis-Server aufsetzen via Terminal ###

* zum 'redis-3.2.5' Ordner wechseln via 'cd'
* 'make test' im Terminal aufrufen und warten bis Prozess fertig
* 'sudo make install' aufrufen
* 'redis-server' im Terminal eingeben
* nun wird der Redis-Server gestartet

### Schritt 2: Node aufsetzen und starten ###

* Node Version v6.9.1 installieren
* 'npm install' ausführen in 2. Terminal-Fenster
* wenn der vorherige Befehl fehlschlägt, dann manuell Abhängigkeiten installieren (siehe package.json -> dependencies)
* 'node server.js' im Terminal aufrufen

## Senden von Datensätzen an die Datenbank 

Die Datensätze müssen über einen POST Request an http://localhost:8080 (lokaler Server) als JSON gesendet werden.

### Das JSON sollte wie folgt aufgebaut sein:

```
{
    "vehicle": {
            "time":62.083332, 
            "speed":75.0,
            "steerAngle":13.39,
            "breakPressure":1.59,
            "id":"1HGBH41JXMN109186"
    }
}
```

### Optional kann das Objekt “vehicle” folgende Attribute beinhalten: 

```
“honk”: “true”
```

### Liste weiterer verfügbarer Attribute
| Beschreibung (EN) | Beschreibung (DE) | Einheit |
| ------------- |-------------| -----:|
|Time|Zeit|Seconds|
|Speed|Geschwindigkeit|km/h|
|Steer angle |Lehnwinkel|°|
|Break pressure|Bremsdruck|Bar|
|Gear|Kupplung|Gear Number|
|Gear temperature |Kupplungs Temperatur|Degree|
|Mileage|Laufleistung|Kilometers|
|Coolant temperature |Temperatur der Kühlflüssigkeit|Degree in Celsius|
|Ambient temperature|Umgebungstemperatur|Degree in Celsius|
|Intake air temperature|Ansauglufttemperatur|Degree in Celsius|
|Micro processor temperature|Mikroprozessor Temperatur|Degree in Celsius|
|Catalyst temperature|Katalysator Temperatur|Degree in Celsius|
|Engine speed|Motordrehzahl|Turns / minute|
|Idling speed|Leerlaufdrehzahl|Turns / minute|
|Ignition timing angle|Zündzeitpunkt|Date & time|
|Torque transmission|Getriebemoment|Nm|
|Hydraulic pump speed|Drehzahl Hydraulikpumpe|Turns / minute|
|Intake air mass|Ansaugluft|g/s|
|Injection timing|Zündkennfeld|°BTDC|
|Hydraulic pump voltage|Hydraulikpumpen Spannung|Volt|
|Fuel rail pressure|Kraftstoffzuleiter Druck|Bar|
|Service reminder status|Status der Service Erinnerung|0 or 1|
|Mileage since service|Kilometerstand seit Service|Kilometer x 100|
|Time since service|Zeit seit Service|Days|
|Accelerator position|Gaspedalstellung|%|

## Empfangen von Datensätzen 

Um Daten empfangen zu können, muss der Klient eine Websocket-Verbindung über Socket.io zur API herstellen. Lokal geht das über `http://localhost:8080/socket.io/`. Wenn die Verbindung aufgebaut ist, wird der Klient über eingehende Daten über das Event `GET_VEHICLE' informiert.
