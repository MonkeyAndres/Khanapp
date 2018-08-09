import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-challenge-multiple',
  templateUrl: './challenge-multiple.component.html',
  styleUrls: ['./challenge-multiple.component.scss']
})
export class ChallengeMultipleComponent implements OnInit {
  @Input() challenge;
  @Output() finish = new EventEmitter<boolean>();

  answers: Array<string>;

  constructor() { }

  ngOnInit() {
    this.answers = [...this.challenge.incorrect_answers, this.challenge.correct_answer];
    this.answers = _.shuffle(this.answers);
  }

  checkAnswer(answer) {
    if (answer === this.challenge.correct_answer) {
      this.finish.emit(true);
    } else {
      this.finish.emit(false);
    }
  }
}
