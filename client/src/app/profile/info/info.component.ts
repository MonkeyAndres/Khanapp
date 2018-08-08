import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }
}
