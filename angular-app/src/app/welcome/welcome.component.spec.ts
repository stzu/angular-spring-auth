import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'oauth-demo'`, () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('oauth-demo');
  });


});
