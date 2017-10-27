import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LevelService } from './../shared/level.service';
import { SponsorService } from './../shared/sponsor.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Sponsor } from './../shared/sponsor';
import { Level } from './../shared/level';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsor-new',
  templateUrl: './sponsor-new.component.html',
  styleUrls: ['./sponsor-new.component.scss']
})
export class SponsorNewComponent implements OnInit {
  sponsor: Sponsor = new Sponsor();
  public levels: FirebaseListObservable<Level[]>;

  constructor(
    private sponsorService: SponsorService,
    private levelService: LevelService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.levels = this.levelService.getLevelList({ orderByChild: 'rank' });
  }

  save() {
    let logo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('logoURL')).files[0]]) {
      logo = selectedFile;
    }
    this.sponsorService.createSponsor(this.sponsor, logo);
    this.sponsor = new Sponsor();
    this.router.navigate(['/sponsors']);
  }

}
