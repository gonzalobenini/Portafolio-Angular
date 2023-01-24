import { animation, AnimationFactory } from '@angular/animations';
import { Component } from '@angular/core';

import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn, Subscriber, Subscription } from 'rxjs';
import { Tarjeta } from '../../../models/tarjeta';
import { TarjetaService } from '../../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {
  form: FormGroup;
  subscription?: Subscription;
  tarjeta?: Tarjeta;
  idTarjeta :number = 0; // en el constructor se le asigna 0 si es si lo que llega al patchear el form es null asique esto bien podria ser idTarjeta?: number;


  constructor(private formBuilder: FormBuilder,
              private tarjetaService: TarjetaService,
              private toastr: ToastrService) {
      this.form = this.formBuilder.group({
      nombreCompleto: ['',[Validators.required]],
      anioNacimiento: ['',[Validators.required]],
      dni: ['',[Validators.required]],
    })
  }
  guardarTarjeta() {
    if (this.idTarjeta === 0) this.guardar()
    else this.editar()
  }

  guardar(){
    const tarjeta: Tarjeta = {
      nombreCompleto: this.form.get('nombreCompleto')?.value,
      anioNacimiento: this.form.get('anioNacimiento')?.value,
      dni: this.form.get('dni')?.value,
    };

    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
      this.toastr.success('Registro agregado', 'La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    })

  };

  editar(){
    const actualizacionesTarjeta = {
      nombreCompleto: this.form.get('nombreCompleto')?.value,
      anioNacimiento: this.form.get('anioNacimiento')?.value,
      dni: this.form.get('dni')?.value
    };

    this.tarjetaService.actualizarTarjeta(actualizacionesTarjeta.dni, actualizacionesTarjeta).subscribe( data => {
      this.toastr.info('Registro actualizado');
      this.tarjetaService.obtenerTarjetas();
      this.resetform();
    })
  }

  resetform(){
    this.form.reset();
    this.idTarjeta = 0;
    this.form.controls['dni'].enable();
  }

  ngOnInit():void{
    this.subscription = this.tarjetaService.obtenerTarjeta$().subscribe( data => {
      // console.log(data);
      this.tarjeta = data;
      this.form.patchValue({
        dni: this.tarjeta.dni,
        nombreCompleto: this.tarjeta.nombreCompleto,
        anioNacimiento: this.tarjeta.anioNacimiento
      })
      this.idTarjeta = this.tarjeta.dni || 0;
      if (this.idTarjeta !== 0) this.form.controls['dni'].disable();
    });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
};
