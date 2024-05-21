import { Injectable } from '@angular/core';
import { Firestore,getDoc,getDocs,addDoc,deleteDoc,updateDoc,collection } from '@angular/fire/firestore';
import { Actor } from '../clases/actor';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  constructor(private bd:Firestore) { }

  guardar(actor:Actor)
  {
    const coleccion = collection(this.bd,'actores')

    return addDoc(coleccion,{
      nombre:actor.nombre,
      apellido:actor.apellido,
      edad:actor.edad,
      pais:actor.pais,
      foto:actor.foto
    })
  }
}
