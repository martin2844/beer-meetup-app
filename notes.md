## ¿Cuál es el problema?

Tenemos un proveedor que nos vende cajas de 6 unidades de birras. El problema es que: si hace entre 20 y 24 grados, se toma una birra por persona; si hace menos de 20 grados, se toma 0.75; y si hace mucho calor (más de 24 grados), se toman 2 birras más por persona. Y siempre preferimos que sobre y no que falte.

 

## Este es nuestro backlog, ¿desarrollamos?
#### Cada historia de usuario una tiene su parte front y back, las dos primeras son obligatorias y cuantas más hagas, ¡mejor!

* Como admin quiero saber cuántas cajas de birras tengo que comprar para poder aprovisionar la meetup.   
```
Endpoint principal, combina weather api + calculo de birras según atendees
```
* Como admin y usuario quiero conocer la temperatura del día de la meetup para saber si va a hacer calor o no.    
```
Endpoint básico de obtener temperatura
```
* Como usuario y como admin quiero poder recibir notificaciones para estar al tanto de las meetups. 
```
Basicamente, hay dos facetas de este punto. Primero estructurar que cada usuario en la BD tenga notificaciones.
Cada notificacion es un objeto. Con lo cual dentro del Schema del usuario vamos a tener lo siguiente:

notifications: {
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: boolean
    },
    date: {
        type: Date,
        default: Date.now 
    }
}

Se le podrìa agregar notificaciones por email.

La segunda faceta serìa en el front, es decir, cuando el usuario está navegando tiene una pestaña de notificaciones. Cuantas levantaria de la BD, como las levanta. Etc.
```    
* Como admin quiero armar una meetup para poder invitar otras personas.      
```
Protected route, es decir un endpoint para armar meetup que solo podes usarlo si estas logueado, y con rol de administrador.
```
* Como usuario quiero inscribirme en una meetup para poder asistir.       
```
Endpoint para Inscribirse como usuario en una meetup. 
```
* Como usuario quiero hacer check-in en una meetup para poder avisar que estuve ahí.    
```
Endpoint de check-in.
```



### Tené en cuenta estos aspectos técnicos
Uso de swagger para las APIs  
Cache, retry, circuit breaker, maturity level, I18N, reactive  
Seguridad  
Front responsive/pwa  
Tests ui  
Testing automático  

## Resumen:

REST API EN NODE: 

endpoints: 
* Get Weather
* Get BirrasAmount (admin)
* Post CreateMeetup (admin)
* Post AttendMeetup
* Get GetActiveMeetups
* Post Check-in Meetups

* Create User

Controllers:
* User Controller
* Meetup Controller
* Weather Controller
* Birra Controller

Schemas:
* Meetup Schema
* User Schema

Utils: 
* Logger

Config: 
* Db Config
* Auth Config
