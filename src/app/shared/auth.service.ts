import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users } from '../home/auth.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL du backend pour les utilisateurs
  private backendURL = 'https://backend-angular-16fq.onrender.com/api'; // Remplacez par votre URL
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  users:users[] = [];
  jwtHelper: any;
  constructor(private http: HttpClient,) {}

  // Route : Inscription
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post<users>(`${this.backendURL}/register`, body);
  }

  isAuthenticated(): boolean {
    if (!this.isLocalStorageAvailable) {
      console.log("localStorage non disponible", this.isLocalStorageAvailable);
      return false;
    } else {
      const token = localStorage.getItem('token');
      console.log('Token trouvé dans localStorage: ', token);
  
      if (token) {
        const isExpired = this.jwtHelper.isTokenExpired(token);
        console.log('Le token est-il expiré ?', isExpired);
        return !isExpired;  // Si le token est valide, retourne true, sinon false
      }
      console.log('Aucun token trouvé');
      return false;  // Si aucun token n'est trouvé
    }
  }
  

  // Vérification si localStorage est disponible
  get isLocalStorageAvailablee(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
  logout(): void {
    // Supprimer le jeton d'authentification (exemple avec localStorage)
    localStorage.removeItem('token');

    // Vous pouvez également supprimer d'autres informations liées à la session
  }
  // Route : Connexion
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<users>(`${this.backendURL}/login`, body);
  }

  // Route : Profil utilisateur (Protégée)
  getProfile(token: string): Observable<any> {
    const headers = { Authorization: token };
    return this.http.get<users>(`${this.backendURL}/profile`, { headers });
  }
}