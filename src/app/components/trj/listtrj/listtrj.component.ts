import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from 'src/app/models/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listtrj',
  templateUrl: './listtrj.component.html',
  styleUrls: ['./listtrj.component.css']
})
export class ListtrjComponent {
  constructor(public tarjetaService: TarjetaService,
              public toastr:ToastrService){}

  ngOnInit(): void{
    this.tarjetaService.obtenerTarjetas();
  }

  eliminarTarjeta(id:number){
    if (confirm('Estas seguro que deseas eliminar la tarjeta')){
      this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
        this.toastr.warning('Se elimino el registro','La tarjeta fue borrada de la base de datos');
        this.tarjetaService.obtenerTarjetas();
      })
    }
  }

  editar(tarjeta: Tarjeta){
    this.tarjetaService.actualizar(tarjeta)
  }
}
