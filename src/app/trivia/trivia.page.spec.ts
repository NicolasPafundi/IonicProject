import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TriviaPage } from './trivia.page';

describe('TriviaPage', () => {
  let component: TriviaPage;
  let fixture: ComponentFixture<TriviaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TriviaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
