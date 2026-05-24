import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios'; // Importación correcta según tu árbol

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

  // Inyectamos el servicio en el constructor
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerTodos().subscribe({
      next: (data: any) => {
        this.usuarios = data;
        this.isLoading = false;
        console.log('Usuarios cargados:', this.usuarios); // Para verificar en consola
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.isLoading = false;
      }
    });
  }
}