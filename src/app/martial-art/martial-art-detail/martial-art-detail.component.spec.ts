import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtDetailComponent } from './martial-art-detail.component';

describe('MartialArtDetailComponent', () => {
  let component: MartialArtDetailComponent;
  let fixture: ComponentFixture<MartialArtDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartialArtDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartialArtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
