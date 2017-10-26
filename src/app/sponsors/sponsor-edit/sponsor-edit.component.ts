import { Router, ActivatedRoute } from '@angular/router';
import { SponsorService } from './../shared/sponsor.service';
import { LevelService } from './../shared/level.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Level } from './../shared/level';
import { Sponsor } from './../shared/sponsor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsor-edit',
  templateUrl: './sponsor-edit.component.html',
  styleUrls: ['./sponsor-edit.component.scss']
})
export class SponsorEditComponent implements OnInit {
  sponsor: Sponsor = new Sponsor();
  public levels: FirebaseListObservable<Level[]>;
  activeKey: string;

  constructor(
    private levelService: LevelService,
    private sponsorService: SponsorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.sponsorService.getSponsor(this.activeKey).subscribe(sponsor => {
        this.sponsor = sponsor;
      });
    });

    this.levels = this.levelService.getLevelList({ orderByChild: 'rank' });
  }

  update() {
    let logo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('logoURL')).files[0]]) {
      logo = selectedFile;
    }
    this.sponsorService.updateSponsor(this.sponsor, logo);
    this.sponsor = new Sponsor();
    this.router.navigate(['/sponsors']);
  }

}
