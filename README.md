# Talk: Node Server

This project is designed to allow server-based functionality to be implemented for the [Talk Presentation Tool](https://github.com/bob-fornal/talk--presentation-tool) and other future projects.

## Implementation

My server is hosted on [Render](https://render.com/); I found it to be simple and straight-forward to get working.

## Startup

You will need a `.env` file like this ...

```env
PORT=3000
SERVICES=project:demo-project
```

In the command line ...

```script
node index.js
```
