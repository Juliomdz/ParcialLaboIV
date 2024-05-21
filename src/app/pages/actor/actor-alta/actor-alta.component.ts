import { Component } from '@angular/core';
import { Actor } from 'src/app/clases/actor';
import {FormBuilder,FormGroup, Validators,AbstractControl} from '@angular/forms';
import Swal from 'sweetalert2'
import { EntidadesService } from 'src/app/services/entidades.service';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent {

  paisSeleccionado:string = ""

  formAlta: FormGroup;

  constructor(private entServicio:EntidadesService,private formBuilder:FormBuilder) 
  {
    this.formAlta = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      pais: ['', Validators.required],
    });
  }

  UnPaisSeleccionado($event:any)
  {
    this.paisSeleccionado = $event;
  }

  GuardarActor()
  {
    if(!this.formAlta.invalid)
    {
      const actor = new Actor(
        this.formAlta.controls['nombre'].value,
        this.formAlta.controls['apellido'].value,
        this.formAlta.controls['edad'].value,
        this.paisSeleccionado,
        ''
      )

      this.entServicio.guardar(actor).then(() =>{
        Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: `Se registro el actor ${actor.nombre} con exito!`
        }).then(() =>{
          this.formAlta.reset()
        })
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Asegurese de completar correctamente los campos!'
      })
    }
  }

}
