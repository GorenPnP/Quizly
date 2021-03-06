import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

import { ApiResultsService } from 'src/app/services/api-results.service';
import { ApiGeneralService } from 'src/app/services/api-general.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {

  currScore: number = 67;
  maxScore: number = 153;
  questionData = {
    topic: 'Hello Topic',
    bundle: 4,
    points: 6,
    id: '0',
    question: {
      text: 'Can you read this?',
      audio: 'TODO: fill here',
      images: [
        { resLocation: 'assets/Pokemon-Go.png', fromCorr: false },
        { resLocation: 'assets/Pokédex-Skin_Cheren.png', fromCorr: true },
      ],
    },
    answer_options: [
      {
        text: 'option 1',
        images: [],
        chosen: true,
        correct: false,
        audio: null,
        answer: null,
        correction: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
      },
      {
        text:
          'option 2 with image mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
        images: [
          { resLocation: 'assets/Pokemon-Go.png' }
          //          { resLocation: 'assets/Pokédex-Skin_Cheren.png' },
        ],
        chosen: false,
        correct: true,
        audio: 'TODO fill',
        answer: 'this is a given answer to a veeeeeeeeeery difficult problem concerning berry colors.',
        correction: 'no, its about the planets SUPER 6'
      }
    ]
  };

  files = [{ title: 'some pdf file' }, { title: 'rand.txt' }];
  correctionFiles = [{ title: 'some pdf file of sweet Goren' }, { title: 'very_well_organized.txt' }];

  /** config for the image slider */
  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 1,
    centeredSlides: true,
    zoom: true
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private alert: AlertService,
              private apiResults: ApiResultsService,
              private apiGeneral: ApiGeneralService
  ) {}

  ngOnInit() {
    this.questionData.id = this.route.snapshot.paramMap.get('id');
    this.apiResults.getQuestion(this.questionData.id).then(data => {
      this.questionData = data;
    });
  }

  reportError(ev) {
    const text = ev.target;
    this.apiGeneral.sendBugReport(text, this.questionData.id);
  }

  logout() {
    this.authService.logout();
  }

  returnHome() {
    // TODO delete this question from review pile

    this.apiResults.archive();
    this.router.navigate(['results', 'index']);
  }
}
