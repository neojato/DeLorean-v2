import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { SessionService } from './../../sessions/shared/session.service';
import { Session } from './../../sessions/shared/session';
import { Survey } from './../../sessions/shared/survey';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
  providers: [ModalDirective, DatePipe]
})
export class SurveysComponent implements OnInit {
  public sessions: FirebaseListObservable<Session[]>;
  public surveyDetail: any;
  surveyData: any[] = [];

  @ViewChild('surveyModal') public surveyModal: ModalDirective;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.sessions = this.sessionService.getSessionList({ orderByChild: 'rank' });
  }

  showModal(session, survey) {
    this.surveyDetail = {
      group1: survey.group1,
      group2: survey.group2,
      group3: survey.group3,
      group4: survey.group4,
      group5: survey.group5,
      group6: survey.group6,
      group7: survey.group7,
      group8: survey.group8,
      comments: survey.comments,
      displayName: survey.displayName,
      email: survey.email,
      title: session.title
    };
    this.surveyModal.show();
  }

  convertDataToCSV(args) {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;
    const datePipe: DatePipe = new DatePipe('en-US');

    data = args.data || null;
    if (data == null) {
      return null;
    }

    data.subscribe(sessions => {
      sessions.map(session => {
        if (session.surveys) {
          const surveys = session.surveys;
          for (const survey in surveys) {
            if (survey) {
              this.surveyData.push(surveys[survey]);
            }
          }
        }
      });
    });

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(this.surveyData[0]);

    // tweak question columns for csv
    const header = Object.keys(this.surveyData[0]);
    header.forEach(function(part, index, array) {
      array[index] = array[index].replace('group', 'question');
    });

    result = '';
    result += header.join(columnDelimiter);
    result += lineDelimiter;

    this.surveyData.forEach(item => {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) {
          result += columnDelimiter;
        }
        if (key === 'timeStamp') {
          result += '"' + datePipe.transform(item[key], 'short') + '"';
        } else {
          result += '"' + item[key] + '"';
        }
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  downloadCSV(args) {
    let data, filename, link;
    let csv = this.convertDataToCSV({
        data: this.sessions
    });

    if (csv == null) {
      return;
    }

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }
}
