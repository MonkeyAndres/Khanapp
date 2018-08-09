import { Component, OnInit, Inject } from '@angular/core';
import { ChallengesService } from '../services/challenges.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  challengeId: any;
  challenge: any;

  time: number;
  countDown: any;

  constructor(
    public dialogRef: MatDialogRef<ChallengeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public challengeService: ChallengesService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.challengeId = this.data.challengeId;
    this.challengeService.getOne(this.challengeId)
    .subscribe(data => {
      this.challenge = data;
      this.time = 100;
      this.initCountDown();
    });
  }

  initCountDown() {
    this.countDown = setInterval(() => {
      this.time -= 10;
      if (this.time <= 0) {
        window.clearInterval(this.countDown);
        this.dialogRef.close();
      }
    }, 1000);
  }

  finishChallenge(status) {
    if (status) {
      this.dialogRef.close(this.challengeId);
    } else {
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
