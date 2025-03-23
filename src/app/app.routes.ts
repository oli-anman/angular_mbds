import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { NavigationErrorComponent } from './navigation-error-component/navigation-error-component.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { LoginComponent } from './home/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
    // Route par défaut
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Routes pour la page d'accueil, la connexion et l'inscription
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    // Routes protégées avec AuthGuard
    {
        path: '',
        canActivate: [AuthGuard], // Utilisation de canActivate pour protéger l'accès
        children: [
            { path: 'assignments', component: AssignmentsComponent },
            { path: 'assignments/:id', component: AssignmentDetailComponent },
            { path: 'assignments/:id/edit', component: EditAssignmentComponent }
        ]
    },

    // Route pour ajouter un assignment
    { path: 'add', component: AddAssignmentComponent },

    // Route vers la page "About me"
    { path: 'about', component: AboutmeComponent },

    // Route pour l'erreur 404 (page non trouvée)
    { path: '**', component: NavigationErrorComponent }
];
