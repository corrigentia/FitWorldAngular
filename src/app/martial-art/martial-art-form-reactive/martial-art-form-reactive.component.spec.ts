import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtFormReactiveComponent } from './martial-art-form-reactive.component';

describe('MartialArtFormReactiveComponent', () => {
  let component: MartialArtFormReactiveComponent;
  let fixture: ComponentFixture<MartialArtFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartialArtFormReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartialArtFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
