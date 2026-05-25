import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  
  usuarios: any[] = [];
  isLoading: boolean = true;

  constructor(
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef // <-- 1. Inyectamos el detector de cambios
  ) {}

  ngOnInit() {
    console.log('1. Iniciando Admin, buscando datos...');
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerTodos().subscribe({
      next: (data: any) => {
        console.log('2. Datos recibidos:', data);
        this.usuarios = data;
        this.isLoading = false; 
        
        // 2. OBLIGAMOS a Angular a redibujar el HTML en este exacto milisegundo
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}