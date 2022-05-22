import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
})
export class ModifyUserPage implements OnInit {
  userEmail: string;
  userName: string;
  userId: string;

  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    name: [
      {type: 'required', message: 'Name is required.'}
    ]
  };

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.showDatas();
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  showDatas(){
    this.authService.userDetails().subscribe(res => {
      if (res != null) {
        const name = res.displayName;
        this.userEmail = res.email;
        this.userName = name;
        this.userId = res.uid;
        this.authService.saveIdUser(res.uid);
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });
  }

  tryRegister(value) {
    this.authService.updateUserName(this.userId,value.name);
    this.goLoginPage()
  }
  goLoginPage() {
    this.navCtrl.navigateBack('user-page');
  }

}
