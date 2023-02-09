import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtSearchComponent } from './martial-art-search.component';

describe('MartialArtSearchComponent', () => {
  let component: MartialArtSearchComponent;
  let fixture: ComponentFixture<MartialArtSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartialArtSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartialArtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
