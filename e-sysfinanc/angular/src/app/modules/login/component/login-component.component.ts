import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,  
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      'usuario': [null, Validators.required],
      'senha': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15)
        ])
      ],
    });   
  }

  entrar(){
    this.snackBar.open('Login efetuado com sucesso', 'Fechar', {
      duration: 5000,
      extraClasses: ['warn-snackbar']
     });    
    this.router.navigate(['/dashboard']);
  }

}
