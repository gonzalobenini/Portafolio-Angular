import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarjeta } from '../models/tarjeta';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://api-production-4ae9.up.railway.app/';
  myApiUrl = 'api/'
  list?: Tarjeta[];
  private actualizarFormulario = new BehaviorSubject<Tarjeta>({} as any);


  constructor(private http: HttpClient ) { }

  guardarTarjeta(tarjeta: Tarjeta): Observable<Tarjeta>{
    return this.http.post<Tarjeta>(this.myAppUrl + this.myApiUrl, tarjeta)
  }

  obtenerTarjetas() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
    .then( data => {
      this.list = data as Tarjeta[];
    })

  }

  eliminarTarjeta(id: number): Observable<Tarjeta> {
    return this.http.delete<Tarjeta>(this.myAppUrl + this.myApiUrl + id);
  }

  actualizar(tarjeta: Tarjeta){
    this.actualizarFormulario.next(tarjeta);
  }

  actualizarTarjeta(id:number, tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.http.patch<Tarjeta>(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }

 obtenerTarjeta$(): Observable<Tarjeta>{
    return this.actualizarFormulario.asObservable();
 }
}
