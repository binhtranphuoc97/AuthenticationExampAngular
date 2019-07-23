import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AuthenticationService } from '../services/AuthenticationService';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuider: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuider.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.userName.value, this.f.password.value).pipe().subscribe(result => {
      this.router.navigate([this.returnUrl]);
    },
    error => {
      this.error = error;
      this.loading = false;
    });
  }
}
