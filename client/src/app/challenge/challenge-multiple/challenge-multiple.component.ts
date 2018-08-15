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
    // Create and answer array with the incorrect and correct answers
    this.answers = [...this.challenge.incorrect_answers, this.challenge.correct_answer];

    this.answers = _.shuffle(this.answers); // Shuffle the array, thanks lodash :D
  }

  // If selected answer === correct answer, emit the finish event with this comparasion result.
  checkAnswer(answer) {
    this.finish.emit(answer === this.challenge.correct_answer);
  }
}
