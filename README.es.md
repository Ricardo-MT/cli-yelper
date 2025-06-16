[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Ricardo-MT/cli-yelper/blob/master/README.md)
---

# CLI Yelper 🚀

CLI Yelper es una herramienta de interfaz de línea de comandos sencilla e intuitiva que te ayuda a gestionar, almacenar y ejecutar rápidamente tus comandos de terminal de uso frecuente. ¡Di adiós a volver a escribir comandos largos o a buscar en el historial de tu shell!

## Características

* **Almacena Comandos:** Guarda fácilmente tus comandos CLI más usados con nombres personalizados.
* **Ejecución Rápida:** Ejecuta tus comandos guardados directamente desde un menú interactivo.
* **Lista Organizada:** Visualiza todos tus comandos almacenados de un vistazo.
* **Crear y Eliminar:** Añade nuevos comandos o elimina los antiguos sin esfuerzo.
* **Almacenamiento Persistente:** Tus comandos se guardan localmente y están disponibles en todas las sesiones.

---

## Instalación

Puedes instalar CLI Yelper globalmente a través de npm:

```bash
npm install -g cli-yelper
```

---

## Uso

Después de la instalación, simplemente ejecuta `cli-yelper` en tu terminal para iniciar el menú interactivo:

```bash
cli-yelper
```

---

### Menú Interactivo

Cuando ejecutes `cli-yelper`, serás recibido con un mensaje de bienvenida y un menú de opciones:

```
-------------------------------------------------------------
------------------- WELCOME TO CLI-YELPER -------------------
-------------------------------------------------------------
Your commands are being saved in /path/to/your/data/commands.json
-------------------------------------------------------------

Select what to do:
❯ Create new
  List all
  Delete
  Exit
```

Así es como interactuar con el menú:

* **Navegar:** Usa las **teclas de flecha** ($\uparrow$, $\downarrow$) para moverte entre las opciones.
* **Seleccionar:** Presiona **Enter** para elegir una opción.

---

### Acciones Disponibles

#### 1. Create New Command (Crear Nuevo Comando)

Si no tienes ningún comando guardado o quieres añadir uno nuevo, selecciona "**Create new**".

Se te pedirá que introduzcas dos datos:

* **Name of the command:** Un nombre amigable para tu comando (por ejemplo, "Update System", "Start Dev Server").
* **Command to execute:** El comando de terminal real (por ejemplo, `sudo apt update && sudo apt upgrade -y`, `npm run dev`).

**Ejemplo:**

```
Select what to do:
  List all
❯ Create new
  Delete
  Exit
```

```
Name of the command: My First Command
Command to execute: echo "Hello, CLI Yelper!"
```

---

#### 2. Run a Saved Command (Ejecutar un Comando Guardado)

Si tienes comandos guardados, aparecerán en el menú principal. Simplemente selecciona el comando que deseas ejecutar.

**Ejemplo:**

```
Select what to do:
  My First Command
❯ List all
  Create new
  Delete
  Exit
```

Después de seleccionar un comando, CLI Yelper lo ejecutará y mostrará la salida.

---

#### 3. List All Commands (Listar Todos los Comandos)

Elige "**List all**" para ver una descripción clara de todos tus comandos guardados, incluyendo sus nombres y los comandos que ejecutan.

```
Select what to do:
  My First Command
❯ List all
  Create new
  Delete
  Exit

--- Available commands ---
0. My First Command -> echo "Hello, CLI Yelper!"
----------------------
```

---

#### 4. Delete a Command (Eliminar un Comando)

Selecciona "**Delete**" para quitar un comando existente. Luego se te pedirá que elijas qué comando eliminar de una lista. Para evitar eliminaciones accidentales, deberás confirmar tu elección escribiendo el nombre del comando.

**Ejemplo:**

```
Select what to do:
  My First Command
  List all
  Create new
❯ Delete
  Exit
```

```
Select command to delete:
❯ My First Command
  Exit

You are about to delete the following command:

        name - My First Command
command line - echo "Hello, CLI Yelper!"

Type the name of the command to confirm: My First Command
```

---

#### 5. Exit (Salir)

Selecciona "**Exit**" para cerrar CLI Yelper.

---

### Version Information (Información de la Versión)

Para comprobar la versión instalada de CLI Yelper, usa el flag `--version` o `-v`:

```bash
cli-yelper --version
# or
cli-yelper -v
```

---

## Cómo Funciona

CLI Yelper almacena tus comandos en un archivo JSON llamado `commands.json` dentro de un directorio de datos dedicado en tu sistema. Esto asegura que tus comandos sean persistentes y estén disponibles cada vez que ejecutes la herramienta. La ubicación de este archivo se muestra al iniciar CLI Yelper.

---

## Contribución

CLI Yelper es un proyecto de código abierto, ¡y las contribuciones son bienvenidas! No dudes en abrir incidencias para informes de errores o solicitudes de características, o enviar pull requests con tus mejoras.

---

## Licencia

Este proyecto está bajo la Licencia MIT.