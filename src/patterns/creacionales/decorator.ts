/*
Decorator es un patrón de diseño estructural que permite añadir dinámicamente nuevos comportamientos a objetos 
colocándolos dentro de objetos especiales que los envuelven (_wrappers_)


Identificación: El patrón Decorator puede ser reconocido por métodos de creación o el constructor que acepta objetos 
de la misma clase o interfaz que la clase actual


Beneficios de este enfoque:

- Composición en lugar de herencia: Al usar decoradores, puedes agregar funcionalidades a las clases de manera flexible y sin modificar el código original.
- Flexibilidad: Puedes agregar múltiples decoradores a un mismo servicio, como lo hicimos con DatabaseLoggingDecorator y DatabaseAuditDecorator.
- Escalabilidad: Puedes seguir creando más decoradores según las necesidades del sistema (por ejemplo, un decorador de cacheo o un decorador de validación).
*/

interface INotification {
  send (message: string): void
}

class BaseNotification implements INotification {
  send (message: string) {
    console.log(`Enviando notificación basica ${message}`)
  }
}

// clase decoradora
abstract class NotificationDecorator implements INotification {
  protected notification: INotification

  constructor(notification: INotification) {
    this.notification = notification
  }

  send (message: string) {
    this.notification.send(message)
  }
}

class EmailDecorator extends NotificationDecorator {

  override send (message: string): void {
    super.send(message)
    this.sendEmail(message)
  }

  private sendEmail (message: string) {
    console.log(`Enviando notificación por correo electronico: ${message}`)
  }
}

class SMSDecorator extends NotificationDecorator {
  override send (message: string): void {
    super.send(message)
    this.sendSMS(message)
  }

  private sendSMS (message: string) {
    console.log(`Enviando notificación por SMS: ${message}`)
  }
}


// EJERCICIO 1

// Paso 1: Definir la interfaz común
// Primero definimos una interfaz común que todos los tipos de usuarios van a implementar.
interface User {
  getPermissions(): string[]
}

// Paso 2: Crear una clase base para un usuario
// La clase base RegularUser implementa la interfaz User y tiene los permisos básicos de un usuario.
class RegularUser implements User {
  getPermissions(): string[] {
    return ['read']
  }
}


// Paso 3: Crear el decorador base
// El decorador es una clase que también implementa la interfaz User y almacena un objeto User dentro de él. 
// Este decorador podrá modificar el comportamiento del método getPermissions de la clase RegularUser o cualquier otra 
// clase que implemente la interfaz User.
class UserDecorator implements User {
  constructor(protected user: User) {

  }
  getPermissions(): string[] {
    return this.user.getPermissions()
  }
}


// Paso 4: Crear decoradores específicos
// Ahora podemos crear decoradores específicos para agregar permisos adicionales a los usuarios. 
// Por ejemplo, podemos crear un decorador AdminUser que extienda los permisos de un usuario.
class AdminUser extends UserDecorator {
  override getPermissions(): string[] {
    return [...this.user.getPermissions(), 'admin']
  }
}

// De forma similar, podríamos tener un decorador para usuarios de tipo "Manager":
class Manager extends UserDecorator {
  override getPermissions(): string[] {
    return [...this.user.getPermissions(), 'manage']
  }
}


// Ejercicio 2
type Stats = { attack: number, defense: number }

interface ICharacter {
  getDescription(): string
  getStats(): Stats
}

class BasicCharacter implements ICharacter {
  getDescription(): string {
    return "Personaje básico."
  }
  getStats(): Stats {
    return {attack: 10, defense: 10}
  }
}

abstract class CharacterDecorator implements ICharacter {
  constructor(protected character: ICharacter) {}

  getDescription(): string {
    return this.character.getDescription()
  }
  getStats(): Stats {
    return this.character.getStats()
  }
}

class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return `${this.character.getDescription()} - con casco 🪖`
  }

  override getStats(): Stats {
    const stats = this.getStats()
    return {attack: stats.attack, defense: stats.defense + 5}
  }
}

class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return `${this.character.getDescription()} - con escudo 🛡️`
  }

  override getStats(): Stats {
    const stats = this.character.getStats()
    return {attack: stats.attack, defense: stats.defense + 10}
  }
}

class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return `${this.character.getDescription()} - con espada 🗡️`
  }

  override getStats(): Stats {
    const stats = this.character.getStats()
    return {attack: stats.attack + 7, defense: stats.defense}
  }
}

class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return `${this.character.getDescription()} - con anillo 💍`
  }
  override getStats(): Stats {
    const stats = this.character.getStats()
    return {attack: stats.attack + 3, defense: stats.defense}
  }
}



// Ejemplo del Patrón Decorador en Logging/Auditoría

// Paso 1: Crear la interfaz de servicio
// Primero definimos una interfaz común para nuestros servicios, que tendrá métodos que realizan operaciones de base de datos.
interface IDatabaseService {
  executeQuery(query: string): string
  saveData<T>(data: T): void
}

// Paso 2: Implementar la clase concreta
// Luego creamos una clase concreta que implementa esta interfaz. 
// Esta clase realiza operaciones de base de datos, pero no tiene ninguna funcionalidad adicional como logging.
class BasicDatabaseService implements IDatabaseService {
  executeQuery(query: string): string {
    return `ejecutando la consulta: ${query}`
  }
  saveData<T>(data: T): void {
    console.log(`datos guardados: ${JSON.stringify(data)}`)
  }
}

// Paso 3: Crear el decorador abstracto
// Creamos un decorador abstracto llamado DatabaseServiceDecorator, que implementa IDatabaseService y acepta una instancia de IDatabaseService. 
// Este decorador se encargará de delegar las operaciones al objeto envuelto (notification), pero permitiendo que se agreguen nuevas funcionalidades.
abstract class DatabaseServiceDecorator implements IDatabaseService {
  constructor(protected dbService: IDatabaseService) {}

  executeQuery(query: string): string {
    return this.dbService.executeQuery(query)
  }

  saveData<T>(data: T): void {
    this.dbService.saveData(data)
  }
}

class DatabaseLoggingDecorator extends DatabaseServiceDecorator {
  override executeQuery(query: string): string {
    console.log(`[LOG] Ejecutando consulta SQL: ${query}`);
    const result = this.dbService.executeQuery(query);
    console.log(`[LOG] Resultado de la consulta: ${result}`);
    return result;    
  }

  override saveData<T>(data: T): void {
    console.log(`[LOG] Guardando datos: ${JSON.stringify(data)}`);
    this.dbService.saveData(data);
    console.log(`[LOG] Datos guardados correctamente.`);
  }
}


class DatabaseAuditDecorator extends DatabaseServiceDecorator {
  override executeQuery(query: string): string {
    const start = Date.now();
    const result = this.dbService.executeQuery(query);
    const end = Date.now();
    console.log(`[AUDIT] Tiempo de ejecución de consulta: ${end - start} ms`);
    return result;
  }

  override saveData<T>(data: T): void {
    const start = Date.now();
    this.dbService.saveData(data);
    const end = Date.now();
    console.log(`[AUDIT] Tiempo para guardar datos: ${end - start} ms`)
  }
}

function main () {
  let notificacion: INotification = new BaseNotification()
  notificacion = new EmailDecorator(notificacion)
  notificacion = new SMSDecorator(notificacion)
  notificacion.send('alerta del sistema')

  // Ejercicio de permisos de usuario
  // Paso 5: Usar los decoradores
  // Finalmente, podemos crear un objeto RegularUser y decorarlo con diferentes capas de funcionalidad según sea necesario, 
  // sin modificar la clase RegularUser original.
  let regularUser: User = new RegularUser() // Crear un usuario regular
  regularUser = new AdminUser(regularUser) // Decorar al usuario regular con permisos de administrador
  regularUser = new Manager(regularUser) // Decorar al usuario regular con permisos de manager
  regularUser.getPermissions()
  
  // podemos combinar decoradores
  const adminManagerUser = new Manager(new AdminUser(regularUser)) // ['read', 'admin', 'manage']
  console.log(adminManagerUser.getPermissions())

  // Ejercicio de un videojuego
  let character: ICharacter = new BasicCharacter()
  character = new HelmetDecorator(character)
  console.log(`Personaje inicial: ${character.getDescription()}`)
  console.log(`Estadisticas: ${character.getStats()}`)

  character = new ShieldDecorator(character)
  console.log(`Personaje con Casco: ${character.getDescription()}`)
  console.log(`Estadisticas: ${character.getStats()}`)

  character = new SwordDecorator(character)
  console.log(`Personaje con Escudo: ${character.getDescription()}`)
  console.log(`Estadisticas: ${character.getStats()}`)

  character = new RingDecorator(character)
  console.log(`Personaje con Escudo: ${character.getDescription()}`)
  console.log(`Estadisticas: ${character.getStats()}`)

  // Ejercicio de logs
  // Paso 6: Usar los decoradores
  // Finalmente, podemos crear un servicio de base de datos básico y envolverlo con varios decoradores para añadirle las funcionalidades de logging y auditoría. 
  let basicDbService = new BasicDatabaseService() // Crear el servicio base
  
  basicDbService = new DatabaseLoggingDecorator(basicDbService)
  
  basicDbService = new DatabaseAuditDecorator(basicDbService)
  
  basicDbService.executeQuery("SELECT * FROM users;")
  basicDbService.saveData<Record<string, any>>({id: 1, name: 'Jonh Doe'})
}
