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
    // This component will be rendered inside of a material design dialog
    public dialogRef: MatDialogRef<ChallengeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Store the data that we pass to this dialog

    public challengeService: ChallengesService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.challengeId = this.data.challengeId; // Pick the challengeId from the dialog data.

    this.challengeService.getOne(this.challengeId)
    .subscribe(data => {
      this.challenge = data;
      this.time = 100;
      this.initCountDown(); // When we have all the challenge data init a 10 secs countdown
    });
  }

  // Simple 10 seconds countdown. When it timeouts the dialog will close itself.
  initCountDown() {
    this.countDown = setInterval(() => {
      this.time -= 10;
      if (this.time <= 0) {
        window.clearInterval(this.countDown); // Strops the countdown when ends
        this.dialogRef.close(); // Close dialog
      }
    }, 1000);
  }

  // When click a answer check if its correct or no. (See challenge-multiple component for more)
  finishChallenge(status) {
    if (status) {
      this.dialogRef.close(this.challengeId);
    } else {
      this.dialogRef.close();
    }
  }

  // Close the dialog clicking in the shadow area.
  onNoClick(): void {
    this.dialogRef.close();
  }
}
