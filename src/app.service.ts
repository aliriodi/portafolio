import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <html>
      <head>
        <title>Portafolio</title>
      </head>
      <body style="text-align:center; margin-top: 50px;">
        <h2>Hello World! ALIRIOs</h2>
        <button onclick="window.location.href='https://www.google.com'">
          Ir a otra página
        </button>
        <br/><br/>
        <img 
          src="https://res.cloudinary.com/dvy9qircy/image/upload/v1694721126/cld-sample-5.jpg" 
          alt="Imagen desde Cloudinary"
          width="300"
        />
      </body>
    </html>
  `;
    //'<p><h2>Hello    World! ALIRIOs </h2></p>  <button onclick=window.location.href=/www.google.com>Ir a otra página</button> <br/><br/> <img src=https://res.cloudinary.com/dvy9qircy/image/upload/v1694721126/cld-sample-5.jpg alt=img/>';
  }
}
