import { SiteConfigService } from './../../admin/shared/site-config/site-config.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { LevelService } from './../shared/level.service';
import { SponsorService } from './../shared/sponsor.service';
import { Sponsor } from './../shared/sponsor';
import { Level } from './../shared/level';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss'],
  providers: [ModalDirective]
})
export class SponsorListComponent implements OnInit {
  public sponsors: Observable<Sponsor[]>;
  public levels: Observable<Level[]>;
  level: Level = new Level();

  @ViewChild('levelModal') public levelModal: ModalDirective;

  constructor(
    private sponsorService: SponsorService,
    private levelService: LevelService,
    public authService: AuthService,
    private router: Router,
    public siteConfigService: SiteConfigService
  ) { }

  ngOnInit() {
    this.sponsors = this.sponsorService.getSponsorList();
    this.levels = this.levelService.getLevelList();
  }

  addLevel() {
    this.level.name = this.level.name.replace(/^\s+|\s+$/g, '');
    this.levelService.createLevel(this.level);
    this.level = new Level();
    this.levelModal.hide();
  }

  deleteLevel(level) {
    if (window.confirm('Are you sure you want to delete this level? This WILL orphan any sponsors tied to it!')) {
      this.levelService.deleteLevel(level.id);
    }
  }

  deleteSponsor(sponsor) {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      this.sponsorService.deleteSponsor(sponsor.id);
    }
  }

}
