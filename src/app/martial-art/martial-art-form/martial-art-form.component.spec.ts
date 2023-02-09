import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtFormComponent } from './martial-art-form.component';

describe('MartialArtFormComponent', () => {
  let component: MartialArtFormComponent;
  let fixture: ComponentFixture<MartialArtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartialArtFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartialArtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
