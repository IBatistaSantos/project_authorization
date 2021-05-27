import { Controller, HttpRequest, HttpResponse } from "../protocols";


class HelloController implements Controller {
 
 async  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
   const response: HttpResponse = {
      body: "Ok chegou aqui",
      statusCode: 200
   }
   return response;
  }
}

export {HelloController};