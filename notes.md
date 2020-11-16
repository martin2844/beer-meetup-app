## ¿Cuál es el problema?

Tenemos un proveedor que nos vende cajas de 6 unidades de birras. El problema es que: si hace entre 20 y 24 grados, se toma una birra por persona; si hace menos de 20 grados, se toma 0.75; y si hace mucho calor (más de 24 grados), se toman 2 birras más por persona. Y siempre preferimos que sobre y no que falte.

 

## Este es nuestro backlog, ¿desarrollamos?
#### Cada historia de usuario una tiene su parte front y back, las dos primeras son obligatorias y cuantas más hagas, ¡mejor!

* Como admin quiero saber cuántas cajas de birras tengo que comprar para poder aprovisionar la meetup.  - Done
```
Endpoint principal, combina weather api + calculo de birras según atendees
```
* Como admin y usuario quiero conocer la temperatura del día de la meetup para saber si va a hacer calor o no.    
```
Endpoint básico de obtener temperatura
```
* Como usuario y como admin quiero poder recibir notificaciones para estar al tanto de las meetups. 
```
Cambio esto, la notificacion es un esquema en si mismo asi:

notificacion
{
    _id: int;
    sender: _id del que manda;
    receiver: _.id del que recibe;
    type: string; 
    content: string;
    is_read: boolean;
    created_at: Date;
}


```    
* Como admin quiero armar una meetup para poder invitar otras personas.  - DONE    
```
Protected route, es decir un endpoint para armar meetup que solo podes usarlo si estas logueado, y con rol de administrador.
```
* Como usuario quiero inscribirme en una meetup para poder asistir.       - DONE
```
Endpoint para Inscribirse como usuario en una meetup. 
```
* Como usuario quiero hacer check-in en una meetup para poder avisar que estuve ahí.    - DONE
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


## Notes 

To add 

Isadmin to user context